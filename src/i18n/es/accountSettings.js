export const accountSettings = () => {
  return {
    title: 'Configuración de la Cuenta',
    info_card: {
      title: 'Detalles de la Cuenta',
      new_user_title: 'Nuevo Ususario',
      edit_user_title: 'Editar Usuario',
      name: 'Nombre',
      first_name: 'Nombre',
      last_name: 'Apellido',
      email: 'Correo Electrónico',
      username: 'Nombre de Usuario',
      company_role: 'Rol',
      employee_id: 'ID Empleado',
      phone_number: 'Número de Teléfono',
      portal_access_level: 'Nivel de Acceso al Portal',
      password: 'Contraseña',
      password_confirm: 'Confirmar Contraseña',
      profile_pic: 'Foto de Perfil',
      user_title: 'Título',
      access_type: 'Tipo de Acceso',
      access: 'Acceso',
      placeholder_first: 'Ingrese nombre',
      placeholder_last: 'Ingrese apellido',
      placeholder_email: 'Ingrese dirección de email',
      placeholder_phone: 'Ingrese teléfono',
      placeholder_username: 'Crear nombre usuario',
      placeholder_pass: 'Crear contraseña',
      placeholder_repass: 'Reingresar contraseña',
      placeholder_employee: 'Ingrese ID',
      placeholder_select: 'Seleccione',
      edit_button: 'Editar'
    },
    form: {
      save: 'Guardar',
      edit: 'Editar',
      add: 'Añadir foto de perfil',
      enter: 'Ingrese',
      username_chars: '(al menos 6 caracteres)',
      create: 'Crear'
    },
    messages: {
      errors: {
        required: 'Campo Obligatorio.',
        email: 'Correo Electrónico inválido.',
        phone: 'Teléfono inválido.',
        password: 'La Contraseña debe tener al menos 6 caracteres.',
        username_taken: 'Nombre de usuario ya tomado',
        email_taken: 'Correo Electrónico ya tomado',
        password_match: 'Las contraseñas no coinciden.'
      }
    }
  }
}
