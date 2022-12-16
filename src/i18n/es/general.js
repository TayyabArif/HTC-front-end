export const general = () => {
  return {
    labels: {
      cancel: 'Cancelar',
      apply: 'Aplicar',
      search: 'Buscar',
      select: 'Selecciona',
      wo: 'WO',
      not_available: 'No disponible',
      loading: 'Cargando'
    },
    messages: {
      errors: {
        required: 'Este campo es requerido.',
        email: 'Debe ser un correo válido.',
        password_does_not_match: 'La contraseña no coincide.',
        no_sites_found: 'No existen resultados. Intente nuevamente.',
        size: 'El tamaño del archivo no puede exceder 25 MB.',
        length_6: 'El campo debe tener al menos 6 caracteres.',
        phone: 'Número de teléfono inválido.',
        sign_in: 'Ambos campos son requeridos para ingresar.'
      },
      select_all: 'Todos',
      select: 'Seleccionar',
      time: 'Hora',
      no_masquerade: 'para iniciar enmascarado como cliente para ver sitios y órdenes de trabajo.'
    },
    priority_options: {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
      critical: 'Crítica'
    },
    report_day_options: {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo'
    },
    report_range_options: {
      daily: 'Diariamente',
      full_week: 'Semana Completa (7 días)',
      two_full_week: 'Dos Semanas (14 días)',
      work_week: 'Semana Trabajo (5 días)',
      two_work_week: 'Dos Semanas Trabajo (10 días)',
      weekend: 'Fin de Semana (2 días)',
      two_weekend: 'Dos Fines de Semana (4 días)',
      full_month: 'Mes Completo (~30 días)'
    },
    report_end_options: {
      never: 'Nunca',
      occurrences: 'Envíos'
    },
    trades_options: {
      land: 'Tierra',
      maintenance: 'Mantenimiento',
      snow: 'Nieve',
      sweep: 'Barrer',
      special: 'Especial'
    }
  }
}
