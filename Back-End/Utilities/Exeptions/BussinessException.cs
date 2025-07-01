using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System;

namespace Utilities.Exeptions
{
    /// <summary>
    /// Excepción base para todos los errores relacionados con la capa de negocio.
    /// Sirve para agrupar todas las excepciones específicas de negocio bajo un mismo tipo,
    /// lo que facilita su manejo y captura diferenciada en otras capas de la aplicación.
    /// </summary>
    public class BusinessException : Exception
    {
        /// <summary>
        /// Constructor que recibe un mensaje descriptivo del error.
        /// </summary>
        /// <param name="message">Mensaje que describe el motivo de la excepción.</param>
        public BusinessException(string message) : base(message) { }

        /// <summary>
        /// Constructor que recibe un mensaje y una excepción interna,
        /// permitiendo propagar la causa original del error.
        /// </summary>
        /// <param name="message">Mensaje descriptivo de la excepción.</param>
        /// <param name="innerException">Excepción interna que originó este error.</param>
        public BusinessException(string message, Exception innerException) : base(message, innerException) { }
    }

    /// <summary>
    /// Excepción específica para cuando una entidad no se encuentra en el sistema,
    /// identificada por su tipo y su ID.
    /// </summary>
    public class EntityNotFoundException : BusinessException
    {
        /// <summary>
        /// Tipo o nombre de la entidad no encontrada (ejemplo: "Usuario", "Producto").
        /// </summary>
        public string EntityType { get; }

        /// <summary>
        /// Valor del identificador de la entidad no encontrada.
        /// </summary>
        public object EntityId { get; }

        /// <summary>
        /// Constructor que permite pasar un mensaje personalizado.
        /// </summary>
        /// <param name="message">Mensaje personalizado para la excepción.</param>
        public EntityNotFoundException(string message) : base(message) { }

        /// <summary>
        /// Constructor que recibe el tipo de entidad y su identificador, generando un mensaje estándar.
        /// </summary>
        /// <param name="entityType">Tipo o nombre de la entidad.</param>
        /// <param name="entityId">Identificador de la entidad.</param>
        public EntityNotFoundException(string entityType, object entityId)
            : base($"La entidad '{entityType}' con ID '{entityId}' no fue encontrada.")
        {
            EntityType = entityType;
            EntityId = entityId;
        }

        /// <summary>
        /// Constructor que recibe tipo de entidad, identificador y una excepción interna,
        /// útil para encadenar excepciones manteniendo el contexto original.
        /// </summary>
        /// <param name="entityType">Tipo o nombre de la entidad.</param>
        /// <param name="entityId">Identificador de la entidad.</param>
        /// <param name="innerException">Excepción interna original.</param>
        public EntityNotFoundException(string entityType, object entityId, Exception innerException)
            : base($"La entidad '{entityType}' con ID '{entityId}' no fue encontrada.", innerException)
        {
            EntityType = entityType;
            EntityId = entityId;
        }
    }

    /// <summary>
    /// Excepción para errores de validación en propiedades específicas de una entidad o modelo.
    /// </summary>
    public class ValidationException : BusinessException
    {
        /// <summary>
        /// Nombre de la propiedad que generó el error de validación.
        /// </summary>
        public string PropertyName { get; }

        /// <summary>
        /// Constructor con mensaje de error general.
        /// </summary>
        /// <param name="message">Mensaje que describe el error de validación.</param>
        public ValidationException(string message) : base(message) { }

        /// <summary>
        /// Constructor que recibe el nombre de la propiedad y un mensaje de error,
        /// para dar mayor detalle sobre el problema encontrado.
        /// </summary>
        /// <param name="propertyName">Nombre de la propiedad con error.</param>
        /// <param name="message">Mensaje de error detallado.</param>
        public ValidationException(string propertyName, string message)
            : base($"Error de validación en '{propertyName}': {message}")
        {
            PropertyName = propertyName;
        }

        /// <summary>
        /// Constructor que recibe mensaje y excepción interna para encadenar errores.
        /// </summary>
        /// <param name="message">Mensaje descriptivo del error.</param>
        /// <param name="innerException">Excepción interna.</param>
        public ValidationException(string message, Exception innerException) : base(message, innerException) { }
    }

    /// <summary>
    /// Excepción para violaciones de reglas de negocio específicas,
    /// con un código identificador para la regla.
    /// </summary>
    public class BusinessRuleViolationException : BusinessException
    {
        /// <summary>
        /// Código o identificador de la regla de negocio que fue violada.
        /// </summary>
        public string RuleCode { get; }

        /// <summary>
        /// Constructor con mensaje general.
        /// </summary>
        /// <param name="message">Mensaje descriptivo del error.</param>
        public BusinessRuleViolationException(string message) : base(message) { }

        /// <summary>
        /// Constructor que recibe el código de la regla y un mensaje específico.
        /// </summary>
        /// <param name="ruleCode">Código identificador de la regla.</param>
        /// <param name="message">Mensaje que explica la violación.</param>
        public BusinessRuleViolationException(string ruleCode, string message)
            : base($"Violación de regla de negocio [{ruleCode}]: {message}")
        {
            RuleCode = ruleCode;
        }

        /// <summary>
        /// Constructor con mensaje y excepción interna para propagar causas originales.
        /// </summary>
        /// <param name="message">Mensaje descriptivo del error.</param>
        /// <param name="innerException">Excepción interna.</param>
        public BusinessRuleViolationException(string message, Exception innerException) : base(message, innerException) { }
    }

    /// <summary>
    /// Excepción que indica intento de acceso no autorizado a un recurso o acción,
    /// con detalles del recurso y operación bloqueada.
    /// </summary>
    public class UnauthorizedAccessBusinessException : BusinessException
    {
        /// <summary>
        /// Nombre o identificador del recurso al que se intentó acceder.
        /// </summary>
        public string Resource { get; }

        /// <summary>
        /// Nombre o descripción de la operación que se intentó realizar.
        /// </summary>
        public string Operation { get; }

        /// <summary>
        /// Constructor con mensaje general.
        /// </summary>
        /// <param name="message">Mensaje descriptivo.</param>
        public UnauthorizedAccessBusinessException(string message) : base(message) { }

        /// <summary>
        /// Constructor que recibe recurso y operación para mensaje estandarizado.
        /// </summary>
        /// <param name="resource">Recurso protegido.</param>
        /// <param name="operation">Operación bloqueada.</param>
        public UnauthorizedAccessBusinessException(string resource, string operation)
            : base($"Acceso no autorizado al recurso '{resource}' para la operación '{operation}'.")
        {
            Resource = resource;
            Operation = operation;
        }

        /// <summary>
        /// Constructor con mensaje y excepción interna para propagar contexto.
        /// </summary>
        /// <param name="message">Mensaje descriptivo.</param>
        /// <param name="innerException">Excepción interna.</param>
        public UnauthorizedAccessBusinessException(string message, Exception innerException) : base(message, innerException) { }
    }

    /// <summary>
    /// Excepción para errores que ocurren al interactuar con servicios externos,
    /// indicando cuál servicio falló y el motivo.
    /// </summary>
    public class ExternalServiceException : BusinessException
    {
        /// <summary>
        /// Nombre o identificador del servicio externo que causó el error.
        /// </summary>
        public string ServiceName { get; }

        /// <summary>
        /// Constructor con mensaje general.
        /// </summary>
        /// <param name="message">Mensaje descriptivo del error.</param>
        public ExternalServiceException(string message) : base(message) { }

        /// <summary>
        /// Constructor que recibe nombre del servicio y mensaje para detalle del error.
        /// </summary>
        /// <param name="serviceName">Nombre del servicio externo.</param>
        /// <param name="message">Mensaje descriptivo del error.</param>
        public ExternalServiceException(string serviceName, string message)
            : base($"Error en el servicio externo '{serviceName}': {message}")
        {
            ServiceName = serviceName;
        }

        /// <summary>
        /// Constructor que recibe nombre del servicio, mensaje y excepción interna,
        /// para mantener contexto de error original.
        /// </summary>
        /// <param name="serviceName">Nombre del servicio externo.</param>
        /// <param name="message">Mensaje descriptivo.</param>
        /// <param name="innerException">Excepción interna original.</param>
        public ExternalServiceException(string serviceName, string message, Exception innerException)
            : base($"Error en el servicio externo '{serviceName}': {message}", innerException)
        {
            ServiceName = serviceName;
        }
    }
}
