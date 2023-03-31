export const dashboard = () => {
  return {
    datetime: {
      today: 'Hoy',
      yesterday: 'Ayer',
      this_week: 'Esta Semana',
      last_week: 'Semana Pasada',
      this_month: 'Este Mes',
      last_month: 'Mes Pasado',
      last_two_months: 'Últimos Dos Meses',
      last_three_months: 'Últimos Tres Meses',
      last_six_months: 'Últimos Seis Meses',
      custom: 'Personalizado'
    },
    updated: 'Actualizado',
    addReport: 'Agregar Reporte',
    add_report: {
      subtitle:
        'Haga las selecciones a continuación para crear sus informes y personalizar su tablero.',
      access: 'Acceso',
      select_report: 'Seleccionar Reporte',
      display_as: 'Mostrar Como',
      none: 'Ninguno',
      bar: 'Barras',
      column: 'Columna',
      pie: 'Pastel',
      scatter: 'Dispersión',
      line: 'Línea',
      continue: 'Continuar'
    },
    reports: {
      open: 'Órdenes de Trabajo Abiertas',
      completed: 'Órdenes de Trabajo Completas',
      in_progress: 'Órdenes de Trabajo en Progreso',
      open_by_trade: 'Órdenes de Trabajo Abiertas por Comercio',
      completed_by_trade: 'Órdenes de Trabajo Completas por Comercio',
      open_vs_complete: '% Abiertos vs Completos',
      average_age: 'Antigüedad Prometio de Órden Trabajo',
      count: '(Cuenta)'
    },
    date_ranges: {
      today: 'Hoy',
      last_3_days: '3 Últimos Días',
      last_5_days: '5 Últimos Días',
      last_7_days: '7 Últimos Días',
      last_30_days: '30 Últimos Días',
      custom: 'Seleccionar Rango'
    }
  }
}
