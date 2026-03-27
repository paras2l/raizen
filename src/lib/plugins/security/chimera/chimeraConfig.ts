import { PresenceNode } from './chimeraTypes';

export const chimeraConfig = {
  activeNodes: 5,
  rotationIntervalMs: 300000, // 5 minutes
  signalShiftFrequencyHz: 0.5,
  defaultNodes: [
    { id: 'CH-ZH', country: 'Switzerland', city: 'Zurich', ip: '179.43.128.1', timezone: 'CET', lat: 47.3769, lng: 8.5417, status: 'Sync' },
    { id: 'JP-TY', country: 'Japan', city: 'Tokyo', ip: '103.1.200.1', timezone: 'JST', lat: 35.6762, lng: 139.6503, status: 'Sync' },
    { id: 'SG-SG', country: 'Singapore', city: 'Singapore', ip: '111.90.140.1', timezone: 'SGT', lat: 1.3521, lng: 103.8198, status: 'Sync' },
    { id: 'IS-RE', country: 'Iceland', city: 'Reykjavik', ip: '185.112.156.1', timezone: 'GMT', lat: 64.1265, lng: -21.8174, status: 'Sync' },
    { id: 'KY-GE', country: 'Cayman Islands', city: 'George Town', ip: '104.223.1.1', timezone: 'EST', lat: 19.2866, lng: -81.368, status: 'Sync' }
  ] as PresenceNode[],
  trackersToDeceive: ['Google-Location-Services', 'Apple-Find-My', 'Baidu-Geo', 'ISP-Triangulation'],
  autoShroudOnDetect: true
};
