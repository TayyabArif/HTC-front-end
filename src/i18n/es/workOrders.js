export const workOrders = () => {
  return {
    search_placeholder: 'Buscar',
    export_selected: 'Exportar Seleccionados',
    download_selected: 'Descargar Seleccionados',
    download_all: 'Descargar Todos',
    filter_counts: 'Contadores',
    filter_sites: 'Usar Mis Sitios',
    advanced_button: 'Búsqueda Avanzada',
    reset_button: 'Limpiar Filtros',
    counts: 'Contadores',
    data_export: 'Exportar Información',
    open_invoice: 'Abrir Factura',
    export_message:
      'Esto podría tomar unos minutos. Se le enviará el reporte mediante email. Por favor asegúrese de buscar en la carpeta de spam.',
    date_ranges: {
      today: 'Hoy',
      yesterday: 'Ayer',
      this_month: 'Este Mes',
      last_month: 'Mes Pasado',
      last_two_months: 'Dos Últimos Meses',
      last_three_months: 'Tres Últimos Meses',
      last_six_months: 'Seis Últimos Meses'
    },
    wo_states: {
      open: 'Abierto',
      active: 'En proceso',
      returning: 'Regresando',
      complete: 'Completo',
      completed: 'Completado',
      in_progress: 'En Progreso',
      cancelled: 'Cancelado',
      expired: 'Expirado',
      no_status: 'Sin estado',
      incomplete: 'Incompleto',
      no_work_order: 'Sin Órdenes'
    },
    column_names: {
      client_name: 'Nombre del Cliente',
      site_name: 'Nombre del Sitio',
      priority: 'Prioridad',
      trade: 'Comercio',
      service: 'Servicio',
      won: 'Orden de Trabajo #',
      opendate: 'Fecha de Inicio',
      duedate: 'Fecha de Fin',
      wostat: 'Estado WO',
      invoices: 'Estado de Factura',
      external_id: 'Tracking Id'
    },
    advanced_fields: {
      state: 'Estado',
      city: 'Ciudad',
      site: 'Nombre de sitio',
      wonum: 'Número de orden de trabajo',
      open_date: 'Fecha de apertura de orden de trabajo',
      wodate: 'Fecha de orden de trabajo',
      past_due: 'Vencimiento',
      service: 'Servicio',
      trade: 'Comercio',
      wo_status: 'Estado de orden de trabajo',
      call_type: 'Tipo de Orden de Trabajo'
    },
    toggle_labels: {
      all: 'Todos',
      custom: 'Personalizado',
      not_selected: 'No Seleccionado',
      select_all: 'Seleccionar Todos'
    },
    details_fields: {
      open: 'Apertura',
      expiration: 'Expira',
      priority: 'Prioridad',
      billing: 'Método de facturación del cliente',
      type: 'Tipo',
      agreement: 'Convenio',
      trip: 'Viaje',
      description: 'Descripción',
      no_call_type: 'Tipo de Orden de Trabajo Indefinido'
    },
    missing_card: {
      trip_not_created: 'Viaje no creado',
      no_activities_found: 'No se encontraron actividades',
      no_activities_found_detail:
        'Un viaje para esta orden de trabajo no ha sido creado.',
      empty_trip:
        'No se pudo encontrar nueva información. Los detalles se actualizarán automáticamente después del check in y check out.'
    },
    csv: {
      sitetitle: 'Nombre de Sitio',
      sitesub: 'Ubicación',
      city: 'Ciudad',
      state: 'Estado',
      trade: 'Comercio',
      service: 'Servicio',
      pon: 'PO #',
      won: 'WO #',
      eta: 'ETA',
      opendate: 'Fecha de Apertura',
      duedate: 'Fecha de Vencimiento',
      call_type: 'Tipo WO',
      wostat: 'Estado WO',
      site_address: 'Dirección del Sitio',
      site_zip: 'Zip del Sitio',
      trip_num: 'Número de Viaje',
      checkin_ftc: 'Ingreso FTC',
      checkout_ftc: 'Salida FTC',
      checkin_web: 'Ingreso Web',
      checkout_web: 'Salida Web',
      tasks_ftc: 'Tareas FTC',
      photos_ftc: 'Fotos FTC',
      tasks_web: 'Tareas Web'
    },
    trips: {
      origin: 'Fuente',
      eta: 'ETA',
      checkin: 'Fecha Registro',
      checkout: 'Fecha Salida',
      no_checkin: 'Entrada no registrada',
      checklist: 'Tareas Realizadas',
      photos: 'Fotos',
      photos_after: 'Fotos Después',
      photos_before: 'Fotos Antes',
      web_trip: 'Portal Web',
      mobile: 'Móbil',
      description: 'Descripción del viaje',
      notes: 'Notas',
      signature: 'Firma',
      add_note: 'Añadir Nota',
      photos_remaining: '{v1} Fotos Restantes',
      one_photos_remaining: '1 Foto Restante',
      mandatory: '(requerido)',
      fields_required:
        'Todos los campos en rojo son requeridos para actualizar el viaje.',
      sign: 'firma',
      enter_signature_name: 'Ingrese el nombre para la firma'
    },
    audit_card: {
      legend: 'Audit Trial proximamente!\nGracias por su paciencia.',
      work_order: 'La Órden de Trabajo',
      created: 'ha sido creada',
      trip: 'El viaje',
      has_created: 'ha sido creado',
      eta_set: 'ETA definido para',
      check_in: 'El contratista ha registrado su ingreso',
      check_out: 'El contratista ha registrado su salida',
      has_changed: 'ha cambiado a'
    },
    apply_advanced: 'Aplicar',
    activities: 'Actividades',
    audit: 'Auditoría',
    details: 'Detalles',
    due: 'Vencimiento',
    empty_message_title: '',
    empty_message:
      'Whoops... No hay órdenes de trabajo en su cuenta. ¡Póngase en contacto con su empresa de gestión para obtener un nuevo trabajo!',
    empty_message_filters:
      'La consulta no arrojó resultados. Revise sus criterios de búsqueda e intente de nuevo.',
    please: 'Por favor',
    try: 'intente nuevamente',
    clear_search: 'Limpiar la Busqueda',
    checkin_message:
      'Los equipos de campo no se han registrado. Los detalles capturados en el campo se actualizan automáticamente después del registro y la salida.',
    checkout_message:
      'Los datos capturados en el campo se actualizan automáticamente.',
    expired_message:
      'La Cita de Servicio ha expirado por inactividad. Contacte a su represntante si otra cita de servicio es requerida.',
    cancelled_message:
      'La Cita de Servicio ha sido cancelada. No hay servicios de campo.',
    images_message:
      'Las fotos se actualizarán automáticamente una vez que el equipo de campo se retire.',
    sort: 'Ordenar',
    clear: 'Limpiar',
    highest: 'Mayor',
    lowest: 'Menor',
    oldest: 'Antiguo',
    newest: 'Reciente',
    service_appointment: 'Cita de Servicio',
    field_service: 'Servicio de Campo',
    audit_trail: {
      created: 'Cita de Servicio {v1} creada',
      checkIn: 'Registo Entrada, FTC',
      checkOut: 'Registro Salida, FTC',
      eta: 'Actualización ETA',
      invoiceCreated: 'Factura creada, Borrador',
      submit: 'Factura Enviada',
      decline: 'Factura Rechazada',
      approve: 'Factura Aprobada'
    },
    wo_details: {
      location: 'Nombre de la Localización',
      address: 'Dirección',
      priority: 'Prioridad',
      start_date: 'Fecha de Inicio',
      end_date: 'Fecha de Caducidad',
      trade: 'Oficio',
      services: 'Servicios',
      location_contacts: 'Contactos de la Localización',
      notes: 'Notas',
      attachments: 'Adjuntos',
      nte: 'NTE'
    },
    upload_messages: {
      clock_in: 'Subiendo registro de entrada',
      clock_out: 'Subiendo registro de salida',
      repair: 'Subiendo formulario {v1}'
    }
  }
}
