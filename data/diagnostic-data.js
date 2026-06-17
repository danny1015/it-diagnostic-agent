window.createDefaultDiagnosticTree = function createDefaultDiagnosticTree(I) {
  const normalizeText = value => String(value ?? '')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<[^>]+>/g, '');
  const normalizeValue = value => Array.isArray(value) ? value.map(normalizeText) : normalizeText(value);
  const text = (lang, key, fallback = '') => (I[lang] && I[lang][key]) || fallback;
  const pair = (key, fallback = '') => ({
    zh: normalizeValue(text('zh', key, fallback)),
    en: normalizeValue(text('en', key, fallback))
  });
  const literal = (zh, en = zh) => ({ zh, en });
  const group = (titleKey, stepsKey, fallbackTitle = '') => ({
    title: pair(titleKey, fallbackTitle),
    steps: {
      zh: normalizeValue(text('zh', stepsKey, [])),
      en: normalizeValue(text('en', stepsKey, []))
    }
  });
  const item = (id, badge, badgeClass, titleKey, subKey, questionKey, groups, fallbackTitle = '') => ({
    id,
    badge: literal(badge),
    badgeClass,
    title: pair(titleKey, fallbackTitle || badge),
    subtitle: pair(subKey, ''),
    question: {
      zh: I.zh.q[questionKey] || '',
      en: I.en.q[questionKey] || ''
    },
    groups
  });

  return [
    {
      id: 'net',
      icon: 'N',
      accent: 'var(--accent)',
      iconBg: 'rgba(0,212,170,.15)',
      title: pair('navNet', 'Network Issues'),
      tag: pair('ntNetTag', 'ENTRY // NETWORK'),
      rootTitle: pair('ntNetTitle', 'Can you ping the gateway?'),
      rootSubtitle: pair('ntNetSub', 'Confirm L3 connectivity'),
      items: [
        item('local-ip', 'Local', 'badge-amber', 'nIpTitle', 'nIpSub', 'local-ip', [
          group('nIpDtitle', 'nIpSteps', 'Troubleshooting Steps')
        ]),
        item('dns', 'DNS', 'badge-amber', 'nDnsTitle', 'nDnsSub', 'dns', [
          group('nDnsTitle', 'nDnsSteps', 'DNS Checks')
        ]),
        item('cctv', 'CCTV', 'badge-blue', 'nCctvTitle', '', 'cctv', [
          group('cctvG1', 'cctvS1'),
          group('cctvG2', 'cctvS2'),
          group('cctvG3', 'cctvS3')
        ], 'CCTV Troubleshooting'),
        item('wifi', 'Wi-Fi', 'badge-blue', 'nWifiTitle', 'nWifiSub', 'wifi', [
          group('nWifiTitle', 'nWifiSteps')
        ]),
        item('isp', 'ISP', 'badge-red', 'nIspTitle', 'nIspSub', 'isp', [
          group('nIspTitle', 'nIspSteps')
        ])
      ]
    },
    {
      id: 'hw',
      icon: 'H',
      accent: 'var(--accent2)',
      iconBg: 'rgba(0,153,255,.15)',
      title: pair('navHw', 'Hardware Issues'),
      tag: pair('ntHwTag', 'ENTRY // HARDWARE'),
      rootTitle: pair('ntHwTitle', 'Select Device Type'),
      rootSubtitle: pair('ntHwSub', 'Server / NAS / Printer'),
      items: [
        item('server', 'Server', 'badge-blue', 'hwSTitle', 'hwSSub', 'server', [
          group('hwSG1', 'hwSS1'),
          group('hwSG2', 'hwSS2')
        ]),
        item('nas', 'NAS', 'badge-blue', 'hwNTitle', 'hwNSub', 'nas', [
          group('hwNG1', 'hwNS1'),
          group('hwNG2', 'hwNS2')
        ]),
        item('printer', 'Printer', 'badge-blue', 'hwPTitle', 'hwPSub', 'printer', [
          group('hwPG1', 'hwPS1'),
          group('hwPG2', 'hwPS2')
        ]),
        item('rma', 'RMA', 'badge-red', 'hwRmaTitle', 'hwRmaSub', 'rma', []),
        item('maintenance', 'PM', 'badge-gray', 'hwMaintTitle', 'hwMaintSub', 'maintenance', []),
        item('asset', 'Asset', 'badge-gray', 'hwAssetTitle', 'hwAssetSub', 'asset', [])
      ]
    },
    {
      id: 'sw',
      icon: 'S',
      accent: 'var(--accent3)',
      iconBg: 'rgba(255,107,53,.15)',
      title: pair('navSw', 'Software Issues'),
      tag: pair('ntSwTag', 'ENTRY // SOFTWARE'),
      rootTitle: pair('ntSwTitle', 'Select System / Application'),
      rootSubtitle: pair('ntSwSub', 'AD / SQL / Exchange / Office / Outlook'),
      items: [
        item('ad', 'AD', 'badge-orange', 'swAdTitle', 'swAdSub', 'ad', [
          group('swAdG1', 'swAdS1'),
          group('swAdG2', 'swAdS2'),
          group('swAdG3', 'swAdS3')
        ]),
        item('sql', 'SQL', 'badge-orange', 'swSqlTitle', 'swSqlSub', 'sql', [
          group('swSqlG1', 'swSqlS1'),
          group('swSqlG2', 'swSqlS2')
        ]),
        item('exchange', 'Exchange', 'badge-orange', 'swExTitle', 'swExSub', 'exchange', [
          group('swExG1', 'swExS1'),
          group('swExG2', 'swExS2')
        ]),
        item('office', 'Office', 'badge-orange', 'swOfficeTitle', 'swOfficeSub', 'office', [
          group('swOfficeG1', 'swOfficeS1'),
          group('swOfficeG2', 'swOfficeS2')
        ]),
        item('outlook', 'Outlook', 'badge-orange', 'swOlTitle', 'swOlSub', 'outlook', [
          group('swOlG1', 'swOlS1'),
          group('swOlG2', 'swOlS2')
        ]),
        item('eventlog', 'Event', 'badge-amber', 'swLogTitle', 'swLogSub', 'eventlog', []),
        item('escalate', 'L2', 'badge-red', 'swEscTitle', 'swEscSub', 'escalate', []),
        item('ticket', 'KB', 'badge-teal', 'swTicketTitle', 'swTicketSub', 'ticket', [])
      ]
    }
  ];
};
