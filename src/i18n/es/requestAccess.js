export const requestAccess = () => {
  return {
    title: 'Solicitar Acceso',
    subtitle_1: 'Por favor ingrese el dominio de su empresa',
    company_domain: 'Dominio de la empresa',
    next: 'Siguiente',
    contact_us_instruction: 'Por favor siga el link de abajo para contactarse con nosotros via correo electrónico',
    call_us: 'o llámenos al ######',
    email_us: 'Envíanos un correo electrónico',
    first_name: 'Nombre',
    last_name: 'Apellido',
    email_address: 'Correo',
    request_access: 'Solicitar Acceso',
    company_name: 'Empresa',
    user_roles: {
      accounting: 'Contabilidad',
      account_manager: 'Administrador de Cuenta',
      administrator: 'Administrador',
      crew_member: 'Miembro de Equipo',
      crew_leader: 'Lider de Equipo',
      dispatcher: 'Despachador',
      field_supervisor: 'Supervisor de Campo',
      installer: 'Instalador',
      manager: 'Gerente',
      operations_manager: 'Gerente de Operaciones',
      owner: 'Dueño',
      president: 'Presidente',
      technician: 'Técnico'
    },
    messages: {
      errors: {
        invalid_domain_structure: 'Por favor ingrese un nombre de dominio válido',
        user_already_exists: 'Dirección de correo ya existente'
      }
    }
  }
}
