import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

export function getBrowserInfo() {
  if (typeof window === 'undefined') return {};
  
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let device_os = "Unknown";

  // Simple OS detection
  if (ua.indexOf("Win") !== -1) device_os = "Windows";
  if (ua.indexOf("Mac") !== -1) device_os = "MacOS";
  if (ua.indexOf("Linux") !== -1) device_os = "Linux";
  if (ua.indexOf("Android") !== -1) device_os = "Android";
  if (ua.indexOf("like Mac") !== -1) device_os = "iOS";

  // Simple Browser detection
  if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
  else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (ua.indexOf("Safari") !== -1) browser = "Safari";
  else if (ua.indexOf("Edge") !== -1) browser = "Edge";
  else if (ua.indexOf("MSIE") !== -1 || ua.indexOf("Trident") !== -1) browser = "IE";

  return {
    browser,
    device_os,
    userAgent: ua,
  };
}

export async function getIpAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address", error);
    return "Unknown";
  }
}

export async function getFullDeviceInfo() {
  const [fingerprint, ipaddress] = await Promise.all([
    getFingerprint(),
    getIpAddress()
  ]);
  
  const browserInfo = getBrowserInfo();
  
  return {
    fingerprint,
    deviceInfo: JSON.stringify({
      ipaddress,
      ...browserInfo
    })
  };
}
