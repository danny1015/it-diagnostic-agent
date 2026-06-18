window.IT_DIAGNOSTIC_DATA_VERSION = '2026.06.18.2';

window.createDefaultDiagnosticTree = function createDefaultDiagnosticTree() {
  return [
    {
      "id": "net",
      "icon": "N",
      "accent": "var(--accent)",
      "iconBg": "rgba(0,212,170,.15)",
      "title": {
        "zh": "網路問題",
        "en": "Network Issues"
      },
      "tag": {
        "zh": "ENTRY // 網路診斷",
        "en": "ENTRY // NETWORK"
      },
      "rootTitle": {
        "zh": "能 ping 通閘道？",
        "en": "Can you ping the gateway?"
      },
      "rootSubtitle": {
        "zh": "確認本機 L3 連線 → 依結果選擇路徑",
        "en": "Confirm L3 connectivity → choose path based on result"
      },
      "items": [
        {
          "id": "local-ip",
          "badge": {
            "zh": "Local",
            "en": "Local"
          },
          "badgeClass": "badge-amber",
          "title": {
            "zh": "IP / DNS / 閘道",
            "en": "IP / DNS / Gateway"
          },
          "subtitle": {
            "zh": "DHCP 衝突或靜態設定錯誤",
            "en": "DHCP conflict or static config error"
          },
          "question": {
            "zh": "本機IP設定問題的完整排查步驟與常見原因",
            "en": "Full troubleshooting steps for local IP configuration issues and common causes."
          },
          "groups": [
            {
              "title": {
                "zh": "排查步驟",
                "en": "Troubleshooting Steps"
              },
              "steps": {
                "zh": [
                  "執行 `ipconfig /all` 確認 IP 範圍",
                  "釋放並重新取得：`ipconfig /release` → `/renew`",
                  "確認預設閘道與子網路遮罩正確",
                  "排除 IP 衝突：`arp -a`",
                  "檢查網路卡驅動是否正常"
                ],
                "en": [
                  "Run `ipconfig /all` to check IP range",
                  "Release and renew: `ipconfig /release` → `/renew`",
                  "Verify default gateway and subnet mask",
                  "Check IP conflict: `arp -a`",
                  "Verify NIC driver status"
                ]
              }
            }
          ]
        },
        {
          "id": "dns",
          "badge": {
            "zh": "DNS",
            "en": "DNS"
          },
          "badgeClass": "badge-amber",
          "title": {
            "zh": "nslookup / DNS 正常？",
            "en": "nslookup / DNS OK?"
          },
          "subtitle": {
            "zh": "能解析網域名稱嗎？",
            "en": "Can you resolve domain names?"
          },
          "question": {
            "zh": "DNS解析失敗的完整排查流程，包含常見錯誤碼說明",
            "en": "DNS resolution is failing. Full troubleshooting steps including common error codes."
          },
          "groups": [
            {
              "title": {
                "zh": "nslookup / DNS 正常？",
                "en": "nslookup / DNS OK?"
              },
              "steps": {
                "zh": [
                  "`nslookup google.com` 確認 DNS 回應",
                  "改用 `8.8.8.8` 測試是否 DNS Server 問題",
                  "清除 DNS 快取：`ipconfig /flushdns`",
                  "確認防火牆未封鎖 UDP 53"
                ],
                "en": [
                  "`nslookup google.com` to check DNS response",
                  "Try `8.8.8.8` to test if DNS server is the issue",
                  "Flush DNS: `ipconfig /flushdns`",
                  "Confirm firewall allows UDP 53"
                ]
              }
            }
          ]
        },
        {
          "id": "cctv",
          "badge": {
            "zh": "CCTV",
            "en": "CCTV"
          },
          "badgeClass": "badge-blue",
          "title": {
            "zh": "CCTV 故障排除",
            "en": "CCTV Troubleshooting"
          },
          "subtitle": {
            "zh": "",
            "en": ""
          },
          "question": {
            "zh": "CCTV攝影機突然全部斷線，NVR顯示離線，PoE供電正常，如何快速診斷？",
            "en": "All CCTV cameras suddenly went offline. NVR shows disconnected. PoE power seems OK. How do I diagnose this quickly?"
          },
          "groups": [
            {
              "title": {
                "zh": "無影像 / 斷線",
                "en": "No Image / Offline"
              },
              "steps": {
                "zh": [
                  "確認 PoE Switch port 供電正常",
                  "Ping IP Camera IP 位址",
                  "確認 NVR 頻道 IP 對應設定",
                  "ONVIF 協定版本相容性確認",
                  "硬體 Reset 重置攝影機 IP"
                ],
                "en": [
                  "Check PoE Switch port power",
                  "Ping IP Camera address",
                  "Verify NVR channel-IP mapping",
                  "Check ONVIF protocol compatibility",
                  "Hard reset camera via reset button"
                ]
              }
            },
            {
              "title": {
                "zh": "影像品質問題",
                "en": "Image Quality Issues"
              },
              "steps": {
                "zh": [
                  "確認頻寬足夠（HD 約 2-4 Mbps/路）",
                  "H.264 → H.265 節省頻寬",
                  "QoS 設定優先 CCTV 流量"
                ],
                "en": [
                  "Verify bandwidth (HD ~2-4 Mbps/ch)",
                  "Switch H.264 → H.265 to save bandwidth",
                  "Set QoS to prioritize CCTV traffic"
                ]
              }
            },
            {
              "title": {
                "zh": "遠端存取問題",
                "en": "Remote Access Issues"
              },
              "steps": {
                "zh": [
                  "Port forwarding 80/554/8080",
                  "DDNS 設定確認",
                  "建議使用 VPN 安全存取"
                ],
                "en": [
                  "Port forwarding 80/554/8080",
                  "Verify DDNS configuration",
                  "Use VPN for secure remote access"
                ]
              }
            }
          ]
        },
        {
          "id": "wifi",
          "badge": {
            "zh": "Wi-Fi",
            "en": "Wi-Fi"
          },
          "badgeClass": "badge-blue",
          "title": {
            "zh": "無線網路",
            "en": "Wireless Network"
          },
          "subtitle": {
            "zh": "AP / 訊號 / 認證",
            "en": "AP / Signal / Auth"
          },
          "question": {
            "zh": "辦公室Wi-Fi連線不穩定，部分電腦無法連線，請協助診斷",
            "en": "Office Wi-Fi is unstable, some computers cannot connect. Help me diagnose."
          },
          "groups": [
            {
              "title": {
                "zh": "無線網路",
                "en": "Wireless Network"
              },
              "steps": {
                "zh": [
                  "確認 AP 電源與 LED 燈號狀態",
                  "SSID 廣播是否開啟",
                  "WPA2/WPA3 密碼確認",
                  "頻道干擾：切換 2.4G ↔ 5GHz",
                  "802.1X 認證 → 檢查 RADIUS"
                ],
                "en": [
                  "Check AP power and LED status",
                  "Verify SSID broadcast is enabled",
                  "Confirm WPA2/WPA3 password",
                  "Channel interference: switch 2.4G ↔ 5GHz",
                  "802.1X auth → check RADIUS server"
                ]
              }
            }
          ]
        },
        {
          "id": "isp",
          "badge": {
            "zh": "ISP",
            "en": "ISP"
          },
          "badgeClass": "badge-red",
          "title": {
            "zh": "上游 ISP 問題",
            "en": "Upstream ISP Issue"
          },
          "subtitle": {
            "zh": "WAN 線路故障",
            "en": "WAN line failure"
          },
          "question": {
            "zh": "ISP線路全斷，如何快速切換備援網路？",
            "en": "ISP line is completely down. How do I quickly switch to a backup network?"
          },
          "groups": [
            {
              "title": {
                "zh": "上游 ISP 問題",
                "en": "Upstream ISP Issue"
              },
              "steps": {
                "zh": [
                  "`ping 8.8.8.8` 測試 ISP 連線",
                  "`tracert` 找出斷點位置",
                  "重開數據機（等待 30 秒）",
                  "聯繫 ISP 報修，記錄案號",
                  "啟用備援 4G/5G Router"
                ],
                "en": [
                  "`ping 8.8.8.8` to test ISP",
                  "`tracert` to find break point",
                  "Reboot modem (wait 30 seconds)",
                  "Contact ISP and note ticket number",
                  "Switch to backup 4G/5G router"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "id": "hw",
      "icon": "H",
      "accent": "var(--accent2)",
      "iconBg": "rgba(0,153,255,.15)",
      "title": {
        "zh": "硬體問題",
        "en": "Hardware Issues"
      },
      "tag": {
        "zh": "ENTRY // 硬體診斷",
        "en": "ENTRY // HARDWARE"
      },
      "rootTitle": {
        "zh": "選擇設備類型",
        "en": "Select Device Type"
      },
      "rootSubtitle": {
        "zh": "主機 / NAS / 印表機 → 依設備展開診斷",
        "en": "Server / NAS / Printer → expand to diagnose"
      },
      "items": [
        {
          "id": "server",
          "badge": {
            "zh": "Server",
            "en": "Server"
          },
          "badgeClass": "badge-blue",
          "title": {
            "zh": "伺服器 / PC",
            "en": "Server / PC"
          },
          "subtitle": {
            "zh": "開機、POST、效能",
            "en": "Boot, POST, Performance"
          },
          "question": {
            "zh": "伺服器開機後沒有POST畫面，無任何Beep聲，請給我診斷步驟",
            "en": "Server has no POST screen after power on, no beep sounds. Give me diagnostic steps."
          },
          "groups": [
            {
              "title": {
                "zh": "無法開機",
                "en": "Cannot Boot"
              },
              "steps": {
                "zh": [
                  "確認電源線、排除 UPS 問題",
                  "無 POST → 逐一移除 RAM 測試",
                  "BIOS Beep 碼對照硬體錯誤",
                  "CMOS 電池更換（時鐘失效）"
                ],
                "en": [
                  "Check power cable, rule out UPS",
                  "No POST → remove RAM sticks one by one",
                  "Check BIOS Beep code for hardware error",
                  "Replace CMOS battery (RTC failure)"
                ]
              }
            },
            {
              "title": {
                "zh": "效能異常",
                "en": "Performance Issues"
              },
              "steps": {
                "zh": [
                  "CPU/記憶體監控，找出瓶頸",
                  "清潔散熱器、更換散熱膏",
                  "memtest86 記憶體診斷",
                  "HDD/SSD SMART 狀態確認"
                ],
                "en": [
                  "Monitor CPU/RAM to find bottleneck",
                  "Clean heatsink, replace thermal paste",
                  "Run memtest86 for memory diagnostics",
                  "Check HDD/SSD SMART status"
                ]
              }
            }
          ]
        },
        {
          "id": "nas",
          "badge": {
            "zh": "NAS",
            "en": "NAS"
          },
          "badgeClass": "badge-blue",
          "title": {
            "zh": "NAS 故障排除",
            "en": "NAS Troubleshooting"
          },
          "subtitle": {
            "zh": "儲存 / RAID / 存取",
            "en": "Storage / RAID / Access"
          },
          "question": {
            "zh": "Synology NAS RAID1出現降級警告，一顆硬碟故障，緊急處理步驟",
            "en": "Synology NAS RAID1 degraded alert, one drive failed. Emergency steps?"
          },
          "groups": [
            {
              "title": {
                "zh": "無法存取",
                "en": "Cannot Access"
              },
              "steps": {
                "zh": [
                  "確認 NAS IP 可被 ping 到",
                  "SMB/NFS 服務是否啟動",
                  "防火牆 445/2049 port 開放",
                  "帳號權限與共享資料夾設定"
                ],
                "en": [
                  "Ping NAS IP to confirm connectivity",
                  "Check if SMB/NFS service is running",
                  "Open firewall port 445/2049",
                  "Check account permissions and share settings"
                ]
              }
            },
            {
              "title": {
                "zh": "RAID 降級",
                "en": "RAID Degraded"
              },
              "steps": {
                "zh": [
                  "管理介面確認 RAID 狀態",
                  "識別故障磁碟（燈號/日誌）",
                  "熱插拔更換故障碟",
                  "RAID 重建期間禁止關機"
                ],
                "en": [
                  "Check RAID status in management UI",
                  "Identify failed disk (LED/logs)",
                  "Hot-swap the failed drive",
                  "Do NOT power off during RAID rebuild"
                ]
              }
            }
          ]
        },
        {
          "id": "printer",
          "badge": {
            "zh": "Printer",
            "en": "Printer"
          },
          "badgeClass": "badge-blue",
          "title": {
            "zh": "印表機故障",
            "en": "Printer Issues"
          },
          "subtitle": {
            "zh": "網路 / 驅動 / 硬體",
            "en": "Network / Driver / Hardware"
          },
          "question": {
            "zh": "Windows 11電腦無法連線網路印表機，顯示離線，如何排查？",
            "en": "Windows 11 PC cannot connect to network printer, shows offline. How to troubleshoot?"
          },
          "groups": [
            {
              "title": {
                "zh": "無法列印",
                "en": "Cannot Print"
              },
              "steps": {
                "zh": [
                  "確認電源與 Ready 燈號",
                  "清除卡紙與列印佇列",
                  "重啟 Print Spooler 服務",
                  "重新安裝驅動程式"
                ],
                "en": [
                  "Check power and Ready LED",
                  "Clear paper jam and print queue",
                  "Restart Print Spooler service",
                  "Reinstall printer driver"
                ]
              }
            },
            {
              "title": {
                "zh": "網路印表機離線",
                "en": "Network Printer Offline"
              },
              "steps": {
                "zh": [
                  "Ping 印表機 IP 確認連線",
                  "設定靜態 IP 避免 DHCP 變動",
                  "GPO 印表機部署設定確認"
                ],
                "en": [
                  "Ping printer IP to check connectivity",
                  "Set static IP to avoid DHCP changes",
                  "Verify GPO printer deployment settings"
                ]
              }
            }
          ]
        },
        {
          "id": "rma",
          "badge": {
            "zh": "RMA",
            "en": "RMA"
          },
          "badgeClass": "badge-red",
          "title": {
            "zh": "硬體更換 / RMA",
            "en": "Hardware Replacement / RMA"
          },
          "subtitle": {
            "zh": "不可修復 → 申請更換",
            "en": "Unrepairable → request replacement"
          },
          "question": {
            "zh": "硬體設備RMA申請流程與需要準備的資料",
            "en": "Hardware RMA process and what information needs to be prepared."
          },
          "groups": []
        },
        {
          "id": "maintenance",
          "badge": {
            "zh": "PM",
            "en": "PM"
          },
          "badgeClass": "badge-gray",
          "title": {
            "zh": "定期巡檢",
            "en": "Scheduled Inspection"
          },
          "subtitle": {
            "zh": "清潔、韌體、備份驗證",
            "en": "Cleaning, firmware, backup check"
          },
          "question": {
            "zh": "IT設備預防性維護計劃，包含主機、NAS、印表機的巡檢項目",
            "en": "IT preventive maintenance plan covering servers, NAS, and printers."
          },
          "groups": []
        },
        {
          "id": "asset",
          "badge": {
            "zh": "Asset",
            "en": "Asset"
          },
          "badgeClass": "badge-gray",
          "title": {
            "zh": "設備台帳更新",
            "en": "Asset Register"
          },
          "subtitle": {
            "zh": "序號、保固、位置記錄",
            "en": "Serial, warranty, location"
          },
          "question": {
            "zh": "IT硬體設備資產管理清單的建立方式與追蹤欄位建議",
            "en": "How to build an IT hardware asset register and what fields to track."
          },
          "groups": []
        }
      ]
    },
    {
      "id": "sw",
      "icon": "S",
      "accent": "var(--accent3)",
      "iconBg": "rgba(255,107,53,.15)",
      "title": {
        "zh": "軟體問題",
        "en": "Software Issues"
      },
      "tag": {
        "zh": "ENTRY // 軟體診斷",
        "en": "ENTRY // SOFTWARE"
      },
      "rootTitle": {
        "zh": "選擇系統 / 應用程式",
        "en": "Select System / Application"
      },
      "rootSubtitle": {
        "zh": "AD / SQL / Exchange / Office / Outlook",
        "en": "AD / SQL / Exchange / Office / Outlook"
      },
      "items": [
        {
          "id": "ad",
          "badge": {
            "zh": "AD",
            "en": "AD"
          },
          "badgeClass": "badge-orange",
          "title": {
            "zh": "AD 問題",
            "en": "AD Issues"
          },
          "subtitle": {
            "zh": "帳號 / GPO / DC 複寫",
            "en": "Accounts / GPO / DC Replication"
          },
          "question": {
            "zh": "Active Directory DC複寫失敗，repadmin顯示錯誤，完整排查流程",
            "en": "Active Directory DC replication failure, repadmin shows errors. Full troubleshooting flow."
          },
          "groups": [
            {
              "title": {
                "zh": "帳號 / 登入問題",
                "en": "Account / Login Issues"
              },
              "steps": {
                "zh": [
                  "帳號鎖定：`Unlock-ADAccount`",
                  "密碼重設與過期政策確認",
                  "Kerberos 票證問題：`klist purge`"
                ],
                "en": [
                  "Account locked: `Unlock-ADAccount`",
                  "Password reset and expiry policy check",
                  "Kerberos ticket issue: `klist purge`"
                ]
              }
            },
            {
              "title": {
                "zh": "GPO 問題",
                "en": "GPO Issues"
              },
              "steps": {
                "zh": [
                  "`gpresult /h report.html` 生成報告",
                  "`gpupdate /force` 強制套用",
                  "確認 WMI Filter 條件"
                ],
                "en": [
                  "`gpresult /h report.html` to generate report",
                  "`gpupdate /force` to force apply",
                  "Verify WMI Filter conditions"
                ]
              }
            },
            {
              "title": {
                "zh": "DC 複寫 / 轉移",
                "en": "DC Replication / Migration"
              },
              "steps": {
                "zh": [
                  "`repadmin /replsummary` 確認狀態",
                  "`dcdiag /test:replications`",
                  "FSMO 角色轉移程序",
                  "`w32tm /resync` 時間同步"
                ],
                "en": [
                  "`repadmin /replsummary` check status",
                  "`dcdiag /test:replications`",
                  "FSMO role transfer procedure",
                  "`w32tm /resync` time sync"
                ]
              }
            }
          ]
        },
        {
          "id": "sql",
          "badge": {
            "zh": "SQL",
            "en": "SQL"
          },
          "badgeClass": "badge-orange",
          "title": {
            "zh": "SQL 問題",
            "en": "SQL Issues"
          },
          "subtitle": {
            "zh": "連線 / 效能 / 備份",
            "en": "Connection / Performance / Backup"
          },
          "question": {
            "zh": "SQL Server 2019連線失敗，錯誤碼18456，如何診斷與修復",
            "en": "SQL Server 2019 connection failure, error 18456. How to diagnose and fix."
          },
          "groups": [
            {
              "title": {
                "zh": "連線失敗",
                "en": "Connection Failure"
              },
              "steps": {
                "zh": [
                  "確認 SQL Server 服務是否運行",
                  "`telnet 伺服器 1433` 測試連接埠",
                  "防火牆 TCP 1433 規則確認",
                  "Named Instance → 啟用 SQL Browser"
                ],
                "en": [
                  "Verify SQL Server service is running",
                  "`telnet server 1433` to test port",
                  "Check firewall rule for TCP 1433",
                  "Named Instance → enable SQL Browser"
                ]
              }
            },
            {
              "title": {
                "zh": "效能問題",
                "en": "Performance Issues"
              },
              "steps": {
                "zh": [
                  "Activity Monitor 找出 blocking query",
                  "索引重建：`ALTER INDEX REBUILD`",
                  "tempdb 多檔案調整"
                ],
                "en": [
                  "Activity Monitor to find blocking queries",
                  "Rebuild indexes: `ALTER INDEX REBUILD`",
                  "Adjust tempdb with multiple files"
                ]
              }
            }
          ]
        },
        {
          "id": "exchange",
          "badge": {
            "zh": "Exchange",
            "en": "Exchange"
          },
          "badgeClass": "badge-orange",
          "title": {
            "zh": "Exchange 問題",
            "en": "Exchange Issues"
          },
          "subtitle": {
            "zh": "郵件流程 / 佇列 / 遷移",
            "en": "Mail Flow / Queue / Migration"
          },
          "question": {
            "zh": "Exchange郵件佇列大量累積，郵件無法送出，如何緊急處理",
            "en": "Exchange mail queue building up, mail cannot be sent. Emergency handling steps."
          },
          "groups": [
            {
              "title": {
                "zh": "郵件無法收發",
                "en": "Mail Send/Receive Failure"
              },
              "steps": {
                "zh": [
                  "`Get-Queue` 查看佇列",
                  "`Test-Mailflow` 測試",
                  "MX / SPF / DKIM 確認"
                ],
                "en": [
                  "`Get-Queue` to check queue",
                  "`Test-Mailflow` to test flow",
                  "Verify MX / SPF / DKIM records"
                ]
              }
            },
            {
              "title": {
                "zh": "遷移至 M365",
                "en": "Migration to M365"
              },
              "steps": {
                "zh": [
                  "Hybrid Configuration Wizard",
                  "MRS Proxy 端點啟用",
                  "DNS 切換時機規劃"
                ],
                "en": [
                  "Run Hybrid Configuration Wizard",
                  "Enable MRS Proxy endpoint",
                  "Plan DNS cutover timing"
                ]
              }
            }
          ]
        },
        {
          "id": "office",
          "badge": {
            "zh": "Office",
            "en": "Office"
          },
          "badgeClass": "badge-orange",
          "title": {
            "zh": "Office 問題",
            "en": "Office Issues"
          },
          "subtitle": {
            "zh": "安裝 / 啟用 / 修復",
            "en": "Install / License / Repair"
          },
          "question": {
            "zh": "Office 365顯示「產品停用」，KMS授權問題如何排查修復",
            "en": "Office 365 shows Product Deactivated. How to troubleshoot KMS licensing issue."
          },
          "groups": [
            {
              "title": {
                "zh": "授權問題",
                "en": "Licensing Issues"
              },
              "steps": {
                "zh": [
                  "`ospp.vbs /dstatus` 確認授權",
                  "KMS 伺服器連線確認",
                  "M365 授權指派（AAD）"
                ],
                "en": [
                  "`ospp.vbs /dstatus` check license",
                  "Verify KMS server connectivity",
                  "Check M365 license assignment in AAD"
                ]
              }
            },
            {
              "title": {
                "zh": "修復安裝",
                "en": "Repair Installation"
              },
              "steps": {
                "zh": [
                  "Online Repair（保留設定）",
                  "Quick Repair（快速修復）",
                  "停用衝突 COM Add-in"
                ],
                "en": [
                  "Online Repair (preserves settings)",
                  "Quick Repair (no internet needed)",
                  "Disable conflicting COM Add-ins"
                ]
              }
            }
          ]
        },
        {
          "id": "outlook",
          "badge": {
            "zh": "Outlook",
            "en": "Outlook"
          },
          "badgeClass": "badge-orange",
          "title": {
            "zh": "Outlook 問題",
            "en": "Outlook Issues"
          },
          "subtitle": {
            "zh": "設定 / 同步 / 故障",
            "en": "Setup / Sync / Crash"
          },
          "question": {
            "zh": "Outlook 2021無法連線Exchange Server，顯示需要密碼，OAuth問題排查",
            "en": "Outlook 2021 cannot connect to Exchange, keeps asking for password. OAuth troubleshooting."
          },
          "groups": [
            {
              "title": {
                "zh": "無法開啟 / 當機",
                "en": "Cannot Open / Crash"
              },
              "steps": {
                "zh": [
                  "安全模式：`outlook /safe`",
                  "重建設定檔：`outlook /cleanprofile`",
                  "刪除 OST 重新同步",
                  "`scanpst.exe` 修復 PST"
                ],
                "en": [
                  "Safe mode: `outlook /safe`",
                  "Rebuild profile: `outlook /cleanprofile`",
                  "Delete OST file to force re-sync",
                  "`scanpst.exe` to repair PST"
                ]
              }
            },
            {
              "title": {
                "zh": "遷移 / 設定",
                "en": "Migration / Setup"
              },
              "steps": {
                "zh": [
                  "Autodiscover 自動設定確認",
                  "現代驗證 OAuth 2.0 設定",
                  "匯出 PST 備份設定"
                ],
                "en": [
                  "Verify Autodiscover auto-config",
                  "Set up Modern Auth (OAuth 2.0)",
                  "Export PST for backup"
                ]
              }
            }
          ]
        },
        {
          "id": "eventlog",
          "badge": {
            "zh": "Event",
            "en": "Event"
          },
          "badgeClass": "badge-amber",
          "title": {
            "zh": "Event Viewer",
            "en": "Event Viewer"
          },
          "subtitle": {
            "zh": "錯誤碼與根因分析",
            "en": "Error codes & root cause"
          },
          "question": {
            "zh": "Windows事件日誌分析方法，如何快速找出IT問題根因",
            "en": "How to analyze Windows Event Logs to quickly find root cause of IT issues."
          },
          "groups": []
        },
        {
          "id": "escalate",
          "badge": {
            "zh": "L2",
            "en": "L2"
          },
          "badgeClass": "badge-red",
          "title": {
            "zh": "升級支援",
            "en": "Escalate to L2"
          },
          "subtitle": {
            "zh": "附日誌 + 操作記錄",
            "en": "Attach logs + action record"
          },
          "question": {
            "zh": "IT問題升級二線支援時需要準備哪些資訊和日誌",
            "en": "What information and logs to prepare when escalating an IT issue to L2 support."
          },
          "groups": []
        },
        {
          "id": "ticket",
          "badge": {
            "zh": "KB",
            "en": "KB"
          },
          "badgeClass": "badge-teal",
          "title": {
            "zh": "關閉 Ticket",
            "en": "Close Ticket"
          },
          "subtitle": {
            "zh": "記錄解法 + KB 更新",
            "en": "Document fix + update KB"
          },
          "question": {
            "zh": "IT問題解決後如何撰寫知識庫文章和更新Runbook",
            "en": "How to write a knowledge base article and update the runbook after resolving an IT issue."
          },
          "groups": []
        }
      ]
    },
    {
      "id": "section-mqj5p0b4-puuv",
      "iconBg": "rgba(136,146,164,.15)",
      "accent": "var(--accent)",
      "items": [],
      "title": {
        "zh": "test",
        "en": "test"
      },
      "icon": "te",
      "tag": {
        "zh": "ENTRY //",
        "en": "ENTRY //"
      },
      "rootTitle": {
        "zh": "test",
        "en": "test"
      },
      "rootSubtitle": {
        "zh": "test",
        "en": "test"
      }
    }
  ];
};
