// Ejemplo de API para el formulario de aromas
// Este archivo muestra cómo implementar el backend para obtener datos del equipo

// Ejemplo de endpoint para obtener datos del equipo
app.get('/api/equipment/:id', async (req, res) => {
    try {
        const equipmentId = req.params.id;
        
        // Buscar equipo en la base de datos
        const equipment = await Equipment.findById(equipmentId);
        
        if (!equipment) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }
        
        // Retornar datos del equipo
        res.json({
            id: equipment.id,
            model: equipment.model,
            location: equipment.location,
            installationDate: equipment.installationDate,
            currentAroma: equipment.currentAroma,
            status: equipment.status,
            clientId: equipment.clientId,
            clientName: equipment.clientName,
            clientEmail: equipment.clientEmail,
            clientPhone: equipment.clientPhone
        });
        
    } catch (error) {
        console.error('Error fetching equipment:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ejemplo de endpoint para enviar datos del formulario
app.post('/api/form-submission', async (req, res) => {
    try {
        const formData = req.body;
        
        // Validar datos requeridos
        if (!formData.userName || !formData.userEmail || !formData.userPhone) {
            return res.status(400).json({ error: 'Datos requeridos faltantes' });
        }
        
        // Crear registro en la base de datos
        const submission = await FormSubmission.create({
            equipmentId: formData.equipmentId,
            installationType: formData.installationType,
            preferredAromas: formData.preferredAromas,
            spaceSize: formData.spaceSize,
            userName: formData.userName,
            userEmail: formData.userEmail,
            userPhone: formData.userPhone,
            recommendation: formData.recommendation,
            timestamp: formData.timestamp,
            userAgent: formData.userAgent,
            status: 'new'
        });
        
        // Enviar notificación por email
        await sendEmailNotification({
            to: formData.userEmail,
            subject: 'Tu propuesta personalizada de Studio Aroma',
            template: 'form-submission',
            data: {
                userName: formData.userName,
                recommendation: formData.recommendation
            }
        });
        
        // Enviar notificación interna
        await sendInternalNotification({
            subject: 'Nueva solicitud de formulario',
            message: `Nueva solicitud de ${formData.userName} para equipo ${formData.equipmentId}`,
            data: submission
        });
        
        res.json({ 
            success: true, 
            message: 'Formulario enviado exitosamente',
            submissionId: submission.id
        });
        
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ejemplo de esquema de base de datos para Equipment
const EquipmentSchema = {
    id: String,
    model: String,
    location: String,
    installationDate: Date,
    currentAroma: String,
    status: String, // 'active', 'inactive', 'maintenance'
    clientId: String,
    clientName: String,
    clientEmail: String,
    clientPhone: String,
    qrCode: String,
    createdAt: Date,
    updatedAt: Date
};

// Ejemplo de esquema de base de datos para FormSubmission
const FormSubmissionSchema = {
    id: String,
    equipmentId: String,
    installationType: String,
    preferredAromas: [String],
    spaceSize: String,
    userName: String,
    userEmail: String,
    userPhone: String,
    recommendation: Object,
    timestamp: Date,
    userAgent: String,
    status: String, // 'new', 'contacted', 'converted', 'closed'
    notes: String,
    createdAt: Date,
    updatedAt: Date
};

// Ejemplo de función para generar QR codes
function generateQRCode(equipmentId) {
    const qrCodeData = {
        equipmentId: equipmentId,
        url: `https://studioaroma.mx/formulario-aromas.html?id=${equipmentId}`,
        timestamp: new Date().toISOString()
    };
    
    // Generar QR code usando una librería como qrcode
    // const qrCode = QRCode.toString(JSON.stringify(qrCodeData), { type: 'svg' });
    
    return qrCodeData;
}

// Ejemplo de función para enviar emails
async function sendEmailNotification({ to, subject, template, data }) {
    // Implementar envío de email usando tu servicio preferido
    // Ejemplo con Nodemailer, SendGrid, etc.
    
    const emailData = {
        to: to,
        subject: subject,
        html: generateEmailTemplate(template, data)
    };
    
    // await emailService.send(emailData);
    console.log('Email enviado:', emailData);
}

// Ejemplo de función para enviar notificaciones internas
async function sendInternalNotification({ subject, message, data }) {
    // Implementar notificación interna
    // Ejemplo con Slack, Discord, email interno, etc.
    
    const notification = {
        subject: subject,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
    
    // await notificationService.send(notification);
    console.log('Notificación interna:', notification);
}

// Ejemplo de función para generar plantilla de email
function generateEmailTemplate(template, data) {
    switch (template) {
        case 'form-submission':
            return `
                <h1>¡Gracias por tu interés en Studio Aroma!</h1>
                <p>Hola ${data.userName},</p>
                <p>Hemos recibido tu solicitud y estamos preparando tu propuesta personalizada.</p>
                <h2>Tu recomendación:</h2>
                <ul>
                    <li><strong>Aroma:</strong> ${data.recommendation.aroma}</li>
                    <li><strong>Difusor:</strong> ${data.recommendation.diffuser}</li>
                    <li><strong>Plan:</strong> ${data.recommendation.plan}</li>
                    <li><strong>Precio:</strong> ${data.recommendation.price}</li>
                </ul>
                <p>Nos pondremos en contacto contigo pronto para coordinar la instalación.</p>
                <p>¡Gracias por elegir Studio Aroma!</p>
            `;
        default:
            return '<p>Gracias por contactarnos.</p>';
    }
}

module.exports = {
    EquipmentSchema,
    FormSubmissionSchema,
    generateQRCode,
    sendEmailNotification,
    sendInternalNotification,
    generateEmailTemplate
};
