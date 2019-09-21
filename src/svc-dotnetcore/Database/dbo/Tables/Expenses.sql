CREATE TABLE [dbo].[Expenses] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Description] NVARCHAR (50) NULL,
    [Date]        DATETIME      NULL,
    [Value]       INT           NOT NULL,
    CONSTRAINT [PK_Expenses] PRIMARY KEY CLUSTERED ([Id] ASC)
);

