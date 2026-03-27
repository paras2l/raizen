import { ControllableDevice, ControlPanelSchema } from './orchestrationTypes';
import { orchestrationLogger } from './orchestrationLogger';

export class DynamicControlUIGenerator {
  public generatePanel(device: ControllableDevice): ControlPanelSchema {
    orchestrationLogger.log(`Synthesizing Dynamic UI for ${device.name} [${device.type}]`);
    
    const elements: ControlPanelSchema['elements'] = [];
    
    // Core Status always included
    elements.push({ id: 'status_view', type: 'STATUS', label: 'Link Integrity', action: 'none', value: 'Sovereign' });

    // Dynamic addition based on capabilities
    if (device.capabilities.includes('DISPLAY')) {
        elements.push({ id: 'power_btn', type: 'BUTTON', label: 'Seize Display Power', action: 'toggle_power' });
        elements.push({ id: 'input_slider', type: 'SLIDER', label: 'Signal Source', action: 'change_input' });
    }

    if (device.capabilities.includes('CAMERA_FEED') || device.capabilities.includes('H_FEED')) {
        elements.push({ id: 'live_feed', type: 'FEED', label: 'Primary Visual Node', action: 'stream_start' });
    }

    if (device.capabilities.includes('MOTOR_XY') || device.capabilities.includes('PTZ')) {
        elements.push({ id: 'pan_tilt', type: 'BUTTON', label: 'Re-orient Node', action: 'move_hardware' });
    }

    return {
        deviceId: device.id,
        elements
    };
  }
}
