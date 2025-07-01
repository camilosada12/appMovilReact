using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class server : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ModelSecurity");

            migrationBuilder.EnsureSchema(
                name: "Logs");

            migrationBuilder.CreateTable(
                name: "form",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_form", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Log",
                schema: "Logs",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Level = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Source = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    StackTrace = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Log", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "module",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_module", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "permission",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_permission", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "person",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstname = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    lastname = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    phonenumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_person", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "rol",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rol", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "formmodule",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    formid = table.Column<int>(type: "int", nullable: false),
                    moduleid = table.Column<int>(type: "int", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_formmodule", x => x.id);
                    table.ForeignKey(
                        name: "FK_FormModule_Form",
                        column: x => x.formid,
                        principalSchema: "ModelSecurity",
                        principalTable: "form",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Module_FormModules",
                        column: x => x.moduleid,
                        principalSchema: "ModelSecurity",
                        principalTable: "module",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "user",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: true),
                    personid = table.Column<int>(type: "int", nullable: true),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                    table.ForeignKey(
                        name: "FK_Person_User",
                        column: x => x.personid,
                        principalSchema: "ModelSecurity",
                        principalTable: "person",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "rolformpermission",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolid = table.Column<int>(type: "int", nullable: false),
                    formid = table.Column<int>(type: "int", nullable: false),
                    permissionid = table.Column<int>(type: "int", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rolformpermission", x => x.id);
                    table.ForeignKey(
                        name: "FK_RolFormPermission_Form",
                        column: x => x.formid,
                        principalSchema: "ModelSecurity",
                        principalTable: "form",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolFormPermission_Permission",
                        column: x => x.permissionid,
                        principalSchema: "ModelSecurity",
                        principalTable: "permission",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolFormPermission_Rol",
                        column: x => x.rolid,
                        principalSchema: "ModelSecurity",
                        principalTable: "rol",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "roluser",
                schema: "ModelSecurity",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rolid = table.Column<int>(type: "int", nullable: false),
                    userid = table.Column<int>(type: "int", nullable: false),
                    isdeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roluser", x => x.id);
                    table.ForeignKey(
                        name: "FK_RolUser_Rol",
                        column: x => x.rolid,
                        principalSchema: "ModelSecurity",
                        principalTable: "rol",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RolUser_User",
                        column: x => x.userid,
                        principalSchema: "ModelSecurity",
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "form",
                columns: new[] { "id", "active", "description", "isdeleted", "name" },
                values: new object[,]
                {
                    { 1, true, "Formulario principal del sistema", false, "Formulario Principal" },
                    { 2, true, "Formulario secundario", false, "Formulario Secundario" }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "module",
                columns: new[] { "id", "active", "description", "isdeleted", "name" },
                values: new object[,]
                {
                    { 1, true, "Módulo para administración general", false, "Módulo Administrativo" },
                    { 2, true, "Módulo encargado de generar reportes", false, "Módulo de Reportes" }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "permission",
                columns: new[] { "id", "active", "description", "isdeleted", "name" },
                values: new object[,]
                {
                    { 1, true, "permiso para leer formularios", false, "Leer" },
                    { 2, true, "permiso para crear formularios", false, "Crear" },
                    { 3, true, "permiso para editar formularios", false, "Editar" },
                    { 4, true, "permiso para eliminar lógicamente formularios", false, "Eliminar" },
                    { 5, true, "permiso para ver formularios eliminados", false, "VerEliminados" },
                    { 6, true, "permiso para recuperar formularios eliminados", false, "Recuperar" }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "person",
                columns: new[] { "id", "active", "firstname", "isdeleted", "lastname", "phonenumber" },
                values: new object[,]
                {
                    { 1, true, "Juan", false, "Pérez", "1234567890" },
                    { 2, true, "Sara", false, "sofia", "312312314" }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "rol",
                columns: new[] { "id", "active", "description", "isdeleted", "name" },
                values: new object[,]
                {
                    { 1, true, "Rol con todos los permisos", false, "Administrador" },
                    { 2, true, "Rol estándar para usuarios normales", false, "Usuario" }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "formmodule",
                columns: new[] { "id", "formid", "isdeleted", "moduleid" },
                values: new object[,]
                {
                    { 1, 1, false, 1 },
                    { 2, 2, false, 1 }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "rolformpermission",
                columns: new[] { "id", "formid", "isdeleted", "permissionid", "rolid" },
                values: new object[,]
                {
                    { 1, 1, false, 1, 2 },
                    { 2, 1, false, 2, 2 },
                    { 3, 1, false, 3, 2 },
                    { 4, 1, false, 4, 2 },
                    { 5, 1, false, 1, 1 },
                    { 6, 1, false, 2, 1 },
                    { 7, 1, false, 3, 1 },
                    { 8, 1, false, 4, 1 },
                    { 9, 1, false, 5, 1 },
                    { 10, 1, false, 6, 1 }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "user",
                columns: new[] { "id", "active", "email", "isdeleted", "password", "personid", "username" },
                values: new object[,]
                {
                    { 1, true, "camilo@gmail.com", false, "admin123", 1, "camilosada12" },
                    { 2, true, "sarita@gmail.com", false, "sara12312", 2, "sara12312" }
                });

            migrationBuilder.InsertData(
                schema: "ModelSecurity",
                table: "roluser",
                columns: new[] { "id", "isdeleted", "rolid", "userid" },
                values: new object[,]
                {
                    { 1, false, 1, 1 },
                    { 2, false, 2, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_formmodule_formid",
                schema: "ModelSecurity",
                table: "formmodule",
                column: "formid");

            migrationBuilder.CreateIndex(
                name: "IX_formmodule_moduleid",
                schema: "ModelSecurity",
                table: "formmodule",
                column: "moduleid");

            migrationBuilder.CreateIndex(
                name: "IX_rolformpermission_formid",
                schema: "ModelSecurity",
                table: "rolformpermission",
                column: "formid");

            migrationBuilder.CreateIndex(
                name: "IX_rolformpermission_permissionid",
                schema: "ModelSecurity",
                table: "rolformpermission",
                column: "permissionid");

            migrationBuilder.CreateIndex(
                name: "IX_rolformpermission_rolid",
                schema: "ModelSecurity",
                table: "rolformpermission",
                column: "rolid");

            migrationBuilder.CreateIndex(
                name: "IX_roluser_rolid",
                schema: "ModelSecurity",
                table: "roluser",
                column: "rolid");

            migrationBuilder.CreateIndex(
                name: "IX_roluser_userid",
                schema: "ModelSecurity",
                table: "roluser",
                column: "userid");

            migrationBuilder.CreateIndex(
                name: "IX_user_personid",
                schema: "ModelSecurity",
                table: "user",
                column: "personid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "formmodule",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "Log",
                schema: "Logs");

            migrationBuilder.DropTable(
                name: "rolformpermission",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "roluser",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "module",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "form",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "permission",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "rol",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "user",
                schema: "ModelSecurity");

            migrationBuilder.DropTable(
                name: "person",
                schema: "ModelSecurity");
        }
    }
}
