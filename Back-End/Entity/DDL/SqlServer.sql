CREATE DATABASE Piscicontrol;
GO
USE Piscicontrol;
GO

CREATE TABLE Module
(
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	[Name] Varchar(100) NOT NULL,
	[Description] varchar(250),
	CreatedDate DateTime DEFAULT CURRENT_TIMESTAMP,
	Active bit,
	IsDeleted bit
	
)

CREATE TABLE Form
(
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	[Name] varchar(100) NOT NULL,
	[Description] NVARCHAR(MAX),
	CreatedDate DateTime DEFAULT CURRENT_TIMESTAMP,
	Active bit,
	IsDeleted bit
)

CREATE TABLE Permission 
(
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	[Name] varchar(100) NOT NULL,
	[Description] NVARCHAR(MAX),
	Active bit,
	IsDeleted bit

)

CREATE TABLE Rol
(
	[Id] INT IDENTITY (1,1) PRIMARY KEY,
	[Name] varchar(100) NOT NULL,
	[Description] NVARCHAR(MAX),
	Active bit,
	IsDeleted bit

)

CREATE TABLE [User]
(
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	UserName VARCHAR(100) NOT NULL UNIQUE,
	Email VARCHAR(100) NOT NULL UNIQUE, 
	[Password] VARCHAR(100) NOT NULL UNIQUE,
	CreatedDate DateTime DEFAULT CURRENT_TIMESTAMP,
	Active bit,
	IsDeleted bit,
	PersonId int UNIQUE

)
CREATE TABLE Person
(
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL, 
	PhoneNumber VARCHAR(20) NOT NULL UNIQUE,
	Active bit,
	IsDeleted bit


)

-- Entidades Pivotes

CREATE TABLE FormModule
(
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	ModuleId int,
	FormId int,
	IsDeleted bit


)

CREATE TABLE RolFormPermission 
(
	[Id] INT IDENTITY(1,1) PRIMARY KEY,
	RolId INT,
	FormId INT, 
	PermissionID INT,
	IsDeleted bit

)

CREATE TABLE RolUser
(
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	RolId int,
	UserId int,
	IsDeleted bit

) 
-- Agregar Relaciones por medio de ALTER TABLE

-- FormModule
ALTER TABLE FormModule ADD CONSTRAINT FK_FormModule_Module FOREIGN KEY (ModuleId) REFERENCES Module(Id);
ALTER TABLE FormModule ADD CONSTRAINT FK_FormModule_Form FOREIGN KEY (FormId) REFERENCES Form(id);

-- RolFormPermission 
ALTER TABLE RolFormPermission ADD CONSTRAINT FK_RolFormPermission_Rol FOREIGN KEY (RolId) REFERENCES Rol(Id);
ALTER TABLE RolFormPermission ADD CONSTRAINT FK_RolFormPermission_Form FOREIGN KEY (FormId) REFERENCES Form(Id);
ALTER TABLE RolFormPermission ADD CONSTRAINT FK_RolFormPermission_Permission FOREIGN KEY (PermissionId) REFERENCES Permission(Id)

-- RolUser

ALTER TABLE RolUser ADD CONSTRAINT FK_RolUser_Rol FOREIGN KEY (RolId) REFERENCES Rol(Id);
ALTER TABLE RolUser ADD CONSTRAINT FK_RolUser_User FOREIGN KEY (UserId) REFERENCES [User](Id);

-- User 
ALTER TABLE [User] ADD CONSTRAINT FK_User_Person FOREIGN KEY (PersonId) REFERENCES Person(Id) -- Relacion Uno a Uno