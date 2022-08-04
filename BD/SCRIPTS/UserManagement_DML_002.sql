USE UM_2RP;
GO

INSERT INTO tipoUsuario (titulo)
VALUES ('Geral'),( 'Admin'), ('Root');
GO

INSERT INTO usuario (idTipoUsuario, nome, email, senha, status)
VALUES (1, 'João Pereira', 'joao.pereira98@gmail.com', '123', 1), 
(2, 'Márcio Freitas', 'marcio.freitas@gmail.com', '456', 1), 
(3, 'Rogério Marques', 'rogerio.marques@gmail.com', '789', 1);
GO