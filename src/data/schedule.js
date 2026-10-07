/**
 * Horario planificado para octubre de 2026.
 *
 * Cada fecha contiene:
 * - status: indica si es un día de trabajo o libre.
 * - blocks: bloques planificados para ese día.
 *
 * Los bloques de trabajo tienen una hora concreta porque
 * conocemos el horario laboral.
 *
 * Los bloques de estudio solamente indican su duración.
 * La aplicación decidirá posteriormente cómo colocarlos
 * dentro del día.
 */
export const schedule = {
  '2026-10-01': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-01',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-01',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-02': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-02',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-02',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-03': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-03',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-ia-2026-10-03',
        type: 'study',
        category: 'ia',
        duration: 60,
        title: 'IA & Big Data',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-04': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-04',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-04',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-05': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-05',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-05',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-06': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-06',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-06',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-07': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-07',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-07',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-08': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-08',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-08',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-09': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-09',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-ia-2026-10-09',
        type: 'study',
        category: 'ia',
        duration: 60,
        title: 'IA & Big Data',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-10': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-10',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-10',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-11': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-11',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-11',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-12': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-12',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-12',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-13': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-13',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-13',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-14': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-14',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-14',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-15': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-15',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-ia-2026-10-15',
        type: 'study',
        category: 'ia',
        duration: 60,
        title: 'IA & Big Data',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-16': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-16',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-16',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-17': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-17',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-ia-2026-10-17',
        type: 'study',
        category: 'ia',
        duration: 60,
        title: 'IA & Big Data',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-18': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-18',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-18',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-19': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-19',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-19',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-20': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-20',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-20',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-21': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-21',
        type: 'work',
        start: '06:00',
        end: '14:40',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-ia-2026-10-21',
        type: 'study',
        category: 'ia',
        duration: 60,
        title: 'IA & Big Data',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-22': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-22',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-22',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-23': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-23',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-ia-2026-10-23',
        type: 'study',
        category: 'ia',
        duration: 60,
        title: 'IA & Big Data',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-24': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-24',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-24',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-25': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-25',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-25',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-26': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-26',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-26',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-27': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-27',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-ia-2026-10-27',
        type: 'study',
        category: 'ia',
        duration: 60,
        title: 'IA & Big Data',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-28': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-28',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-28',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-29': {
    status: 'work',
    blocks: [
      {
        id: 'work-2026-10-29',
        type: 'work',
        start: '11:00',
        end: '18:00',
        title: 'Trabajo',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-29',
        type: 'study',
        category: 'renfe',
        duration: 60,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-30': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-30',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-30',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  },

  '2026-10-31': {
    status: 'free',
    blocks: [
      {
        id: 'study-ia-2026-10-31',
        type: 'study',
        category: 'ia',
        duration: 120,
        title: 'IA & Big Data',
        completed: false,
        original: true
      },
      {
        id: 'study-renfe-2026-10-31',
        type: 'study',
        category: 'renfe',
        duration: 120,
        title: 'Renfe',
        completed: false,
        original: true
      }
    ]
  }
}
