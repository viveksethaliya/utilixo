---
title: "WiFi Connected But No Internet Access - Complete Fix"
description: "Step-by-step guide to fix WiFi connected but no internet issue in Windows 10 and Windows 11. Works for all WiFi problems."
tags: ["wifi", "no internet", "connected but no access", "network", "dns", "windows", "internet not working"]
date: "2025-01-22"
---

## Problem

Your computer shows WiFi as **connected** with full signal bars, but you cannot access the internet. Websites won't load, apps can't connect online, and you may see "No internet, secured" or "Connected, no internet" message.

## Quick Fix (Works 90% of the Time)

### Solution 1: Restart Network Stack

This resets all network components without affecting your files.

**Step 1:** Press `Windows + X` and select **Windows Terminal (Admin)** or **Command Prompt (Admin)**

**Step 2:** Copy and paste these commands **one by one**:

```
ipconfig /release
ipconfig /renew
ipconfig /flushdns
netsh winsock reset
netsh int ip reset
```

**Step 3:** Restart your computer

**Step 4:** Reconnect to your WiFi network

**Success Rate:** This fixes 90% of WiFi connection issues.

---

## Solution 2: Change DNS Servers to Google DNS

DNS issues are the #1 cause of "connected but no internet" problems.

**Step 1:** Press `Windows + R`, type `ncpa.cpl`, press Enter

**Step 2:** Right-click your **WiFi adapter** → **Properties**

**Step 3:** Select **Internet Protocol Version 4 (TCP/IPv4)** → **Properties**

**Step 4:** Choose **"Use the following DNS server addresses"**

Enter these DNS servers:
- **Preferred DNS:** `8.8.8.8` (Google)
- **Alternate DNS:** `8.8.4.4` (Google)

**Step 5:** Click **OK** → **OK** → **Close**

**Step 6:** Test your connection by opening a website

**Why This Works:** Your ISP's DNS servers may be down or slow. Google's DNS is reliable and fast.

---

## Solution 3: Disable IPv6 (If DNS Doesn't Work)

Sometimes IPv6 causes conflicts with WiFi connections.

**Step 1:** Press `Windows + R`, type `ncpa.cpl`, press Enter

**Step 2:** Right-click your **WiFi adapter** → **Properties**

**Step 3:** **Uncheck** the box next to **Internet Protocol Version 6 (TCP/IPv6)**

**Step 4:** Click **OK**

**Step 5:** Restart your computer

---

## Solution 4: Forget and Reconnect to Network

This clears corrupted WiFi settings.

**Step 1:** Click the **WiFi icon** in taskbar → **Network settings**

**Step 2:** Click **WiFi** → **Manage known networks**

**Step 3:** Select your network → **Forget**

**Step 4:** Click the **WiFi icon** again

**Step 5:** Select your network → Enter password → Connect

---

## Solution 5: Update Network Adapter Driver

Outdated drivers cause connection problems.

**Step 1:** Right-click **Start** → **Device Manager**

**Step 2:** Expand **Network adapters**

**Step 3:** Right-click your WiFi adapter → **Update driver**

**Step 4:** Choose **Search automatically for drivers**

**Step 5:** Wait for Windows to download and install updates

**Step 6:** Restart your computer

---

## Solution 6: Reset Network Adapter

Complete network adapter reset.

**Step 1:** Go to **Settings** → **Network & Internet**

**Step 2:** Scroll down → **Network reset**

**Step 3:** Click **Reset now**

**Step 4:** Confirm → Restart computer

**Warning:** This will forget all saved WiFi networks.

---

## Still Not Working? Check Your Router

If your computer shows "connected" but other devices also can't access internet, the problem is your **router** or **ISP**, not your computer.

### Fix Router Issues:

**Step 1:** Unplug your router's power cable

**Step 2:** Wait **30 seconds**

**Step 3:** Plug it back in

**Step 4:** Wait 2-3 minutes for full restart

**Step 5:** Try connecting again

### Contact ISP:

If router restart doesn't work:
- Check if there's an **internet outage** in your area
- Contact your **Internet Service Provider (ISP)**
- They may need to reset your connection

---

## Prevention Tips

1. **Keep Windows updated** - Windows Update → Check for updates
2. **Use Google DNS permanently** - Faster and more reliable
3. **Restart router monthly** - Prevents connection issues
4. **Update network drivers regularly** - Check Device Manager

---

## Related Issues

- [WiFi Keeps Disconnecting](#) - Coming soon
- [Slow WiFi Speed](#) - Coming soon
- [Can't Connect to WiFi](#) - Coming soon
