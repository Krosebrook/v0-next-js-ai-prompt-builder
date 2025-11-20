export const SCENE_TYPES = [
  {
    type: 'splash',
    label: 'Splash / Logo Reveal',
    description: 'Animated opening with sound design, logo morphing into UI elements',
    defaultDuration: 5,
    template: {
      background_type: 'gradient',
      background_config: {
        from: '#6366f1',
        to: '#8b5cf6',
        direction: 'diagonal'
      },
      sound_design: {
        music: 'upbeat_intro',
        effects: ['logo_whoosh', 'sparkle']
      }
    }
  },
  {
    type: 'onboarding',
    label: 'Onboarding',
    description: 'Avatar introduces app functions, animated background transitions',
    defaultDuration: 15,
    template: {
      background_type: 'video',
      background_config: {
        type: 'particles',
        speed: 'slow',
        color: 'primary'
      },
      sound_design: {
        voiceover: true,
        music: 'ambient_calm'
      }
    }
  },
  {
    type: 'dashboard',
    label: 'Dashboard',
    description: 'Interactive components: button hover states, card flips, animated data charts',
    defaultDuration: 20,
    template: {
      background_type: 'solid',
      background_config: {
        color: 'background',
        pattern: 'grid'
      },
      sound_design: {
        effects: ['click', 'hover', 'transition']
      }
    }
  },
  {
    type: 'interaction',
    label: 'Interaction',
    description: 'User drags, filters, navigates with smooth micro-interactions and accessibility cues',
    defaultDuration: 25,
    template: {
      background_type: 'gradient',
      background_config: {
        from: '#f3f4f6',
        to: '#e5e7eb',
        direction: 'vertical'
      },
      sound_design: {
        effects: ['drag', 'drop', 'filter', 'navigate']
      }
    }
  },
  {
    type: 'completion',
    label: 'Completion',
    description: 'Success state with celebratory animation and avatar CTA',
    defaultDuration: 10,
    template: {
      background_type: 'gradient',
      background_config: {
        from: '#10b981',
        to: '#3b82f6',
        direction: 'radial'
      },
      sound_design: {
        music: 'celebration',
        effects: ['confetti', 'success_chime']
      }
    }
  }
] as const

export const ANIMATION_PRESETS = [
  {
    type: 'fade',
    label: 'Fade In/Out',
    duration_ms: 300,
    easing: 'ease-in-out',
    properties: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    }
  },
  {
    type: 'slide',
    label: 'Slide',
    duration_ms: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    properties: {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(0)' }
    }
  },
  {
    type: 'scale',
    label: 'Scale',
    duration_ms: 350,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    properties: {
      from: { transform: 'scale(0.8)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 }
    }
  },
  {
    type: 'morph',
    label: 'Morphing',
    duration_ms: 600,
    easing: 'ease-in-out',
    properties: {
      morphPath: true,
      interpolate: 'path'
    }
  },
  {
    type: 'parallax',
    label: 'Parallax Scroll',
    duration_ms: 1000,
    easing: 'linear',
    properties: {
      layers: 3,
      speed: [0.3, 0.6, 1.0]
    }
  }
] as const

export const COMPONENT_TEMPLATES = [
  {
    type: 'button',
    label: 'Button',
    properties: {
      variant: 'primary',
      size: 'medium',
      cornerRadius: 8,
      shadow: 'medium'
    },
    interactions: {
      hover: { scale: 1.05, shadow: 'large' },
      active: { scale: 0.95 },
      focus: { outline: 'primary', outlineWidth: 2 }
    },
    accessibility: {
      role: 'button',
      ariaLabel: 'Action button',
      keyboardNav: true,
      focusVisible: true
    }
  },
  {
    type: 'card',
    label: 'Card',
    properties: {
      padding: 24,
      cornerRadius: 12,
      shadow: 'medium',
      border: true
    },
    interactions: {
      hover: { shadow: 'large', translateY: -4 }
    },
    accessibility: {
      role: 'article',
      ariaLabel: 'Content card',
      keyboardNav: true
    }
  },
  {
    type: 'form',
    label: 'Form Input',
    properties: {
      height: 44,
      padding: 12,
      cornerRadius: 8,
      border: true
    },
    interactions: {
      focus: { borderColor: 'primary', borderWidth: 2 },
      error: { borderColor: 'error', shake: true }
    },
    accessibility: {
      role: 'textbox',
      ariaLabel: 'Input field',
      ariaRequired: true,
      ariaInvalid: false
    }
  },
  {
    type: 'navigation',
    label: 'Navigation',
    properties: {
      height: 64,
      sticky: true,
      backdrop: 'blur'
    },
    interactions: {
      scroll: { background: 'solid', shadow: 'medium' }
    },
    accessibility: {
      role: 'navigation',
      ariaLabel: 'Main navigation',
      keyboardNav: true,
      skipLink: true
    }
  },
  {
    type: 'chart',
    label: 'Data Chart',
    properties: {
      type: 'line',
      animated: true,
      responsive: true,
      colors: ['primary', 'secondary', 'accent']
    },
    interactions: {
      hover: { tooltip: true, highlight: true }
    },
    accessibility: {
      role: 'img',
      ariaLabel: 'Data visualization',
      dataTable: true
    }
  }
] as const

export const AVATAR_STYLES = [
  {
    style: 'realistic',
    label: 'Realistic',
    description: 'Photorealistic human avatar',
    features: {
      rendering: 'high-quality',
      expressions: 'natural',
      lighting: 'cinematic'
    }
  },
  {
    style: 'stylized',
    label: 'Stylized',
    description: 'Illustrated or cartoon-style avatar',
    features: {
      rendering: 'artistic',
      expressions: 'exaggerated',
      lighting: 'flat'
    }
  }
] as const

export const COLOR_PALETTES = {
  minimalist: {
    primary: ['#2563eb', '#3b82f6', '#60a5fa'],
    secondary: ['#64748b', '#94a3b8', '#cbd5e1'],
    accent: ['#f59e0b', '#fbbf24', '#fcd34d'],
    success: ['#10b981', '#34d399', '#6ee7b7'],
    warning: ['#f59e0b', '#fbbf24', '#fcd34d'],
    error: ['#ef4444', '#f87171', '#fca5a5'],
    neutral: ['#111827', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6']
  },
  cinematic: {
    primary: ['#1e3a8a', '#2563eb', '#3b82f6'],
    secondary: ['#7c3aed', '#8b5cf6', '#a78bfa'],
    accent: ['#dc2626', '#ef4444', '#f87171'],
    success: ['#065f46', '#10b981', '#34d399'],
    warning: ['#b45309', '#f59e0b', '#fbbf24'],
    error: ['#991b1b', '#dc2626', '#ef4444'],
    neutral: ['#0c0a09', '#1c1917', '#292524', '#57534e', '#78716c', '#a8a29e', '#d6d3d1']
  },
  futuristic: {
    primary: ['#0ea5e9', '#06b6d4', '#22d3ee'],
    secondary: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
    accent: ['#ec4899', '#f472b6', '#f9a8d4'],
    success: ['#14b8a6', '#2dd4bf', '#5eead4'],
    warning: ['#f97316', '#fb923c', '#fdba74'],
    error: ['#f43f5e', '#fb7185', '#fda4af'],
    neutral: ['#020617', '#0f172a', '#1e293b', '#334155', '#64748b', '#94a3b8', '#cbd5e1']
  }
}
