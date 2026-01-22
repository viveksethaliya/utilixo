---
title: "How to Fix Windows Blue Screen of Death (BSOD)"
description: "Complete guide to diagnose and fix Windows blue screen errors with step-by-step solutions."
tags: ["blue screen", "bsod", "windows crash", "stop error", "windows 10", "windows 11", "system crash"]
date: "2025-01-22"
---

## What is Blue Screen of Death (BSOD)?

The Blue Screen of Death is a stop error screen displayed by Windows when it encounters a critical system error. Your computer will restart automatically after showing this screen.

## Common BSOD Error Codes

- **DRIVER_IRQL_NOT_LESS_OR_EQUAL** - Faulty driver
- **SYSTEM_SERVICE_EXCEPTION** - System file corruption  
- **PAGE_FAULT_IN_NONPAGED_AREA** - RAM or driver issue
- **CRITICAL_PROCESS_DIED** - Windows core process failure

## Solution 1: Update Windows and Drivers

### Update Windows

**Step 1:** Press `Windows + I` to open Settings

**Step 2:** Go to **Update & Security** → **Windows Update**

**Step 3:** Click **Check for updates**

**Step 4:** Install all available updates

**Step 5:** Restart computer

### Update Drivers

**Step 1:** Right-click **Start** → **Device Manager**

**Step 2:** Look for devices with yellow warning icon

**Step 3:** Right-click each → **Update driver**

**Step 4:** Choose **Search automatically for drivers**

## Solution 2: Run Memory Diagnostic

**Step 1:** Press `Windows + R`

**Step 2:** Type `mdsched.exe` and press Enter

**Step 3:** Choose **Restart now and check for problems**

**Step 4:** Wait for test to complete (takes 10-20 minutes)

**Step 5:** Check results after restart

## Solution 3: Check Disk for Errors

**Step 1:** Open **Command Prompt as Administrator**

**Step 2:** Type: `chkdsk /f /r C:`

**Step 3:** Press `Y` when asked to schedule check

**Step 4:** Restart computer

**Step 5:** Wait for check to complete (can take 1-2 hours)

## Prevention Tips

1. Keep Windows and drivers updated
2. Install reliable antivirus software
3. Don't overload startup programs
4. Ensure good PC ventilation
5. Clean dust from components regularly

## When to Seek Professional Help

If BSOD persists after all solutions:
- It may indicate hardware failure (RAM, hard drive, motherboard)
- Take PC to authorized service center
- Consider hardware diagnostics
