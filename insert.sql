
-- Inserir dados na tabela estados
INSERT INTO estados (nome_estado, sigla) VALUES
('Acre', 'AC'),
('Alagoas', 'AL'),
('Amapá', 'AP'),
('Amazonas', 'AM'),
('Bahia', 'BA'),
('Ceará', 'CE'),
('Distrito Federal', 'DF'),
('Espírito Santo', 'ES'),
('Goiás', 'GO'),
('Maranhão', 'MA'),
('Mato Grosso', 'MT'),
('Mato Grosso do Sul', 'MS'),
('Minas Gerais', 'MG'),
('Pará', 'PA'),
('Paraíba', 'PB'),
('Paraná', 'PR'),
('Pernambuco', 'PE'),
('Piauí', 'PI'),
('Rio de Janeiro', 'RJ'),
('Rio Grande do Norte', 'RN'),
('Rio Grande do Sul', 'RS'),
('Rondônia', 'RO'),
('Roraima', 'RR'),
('Santa Catarina', 'SC'),
('São Paulo', 'SP'),
('Sergipe', 'SE'),
('Tocantins', 'TO');

-- Inserir dados na tabela cidades
INSERT INTO cidades (nome_cidade, estadoId) VALUES
('Rio Branco', (SELECT id FROM estados WHERE sigla = 'AC')),
('Cruzeiro do Sul', (SELECT id FROM estados WHERE sigla = 'AC')),
('Maceió', (SELECT id FROM estados WHERE sigla = 'AL')),
('Arapiraca', (SELECT id FROM estados WHERE sigla = 'AL')),
('Macapá', (SELECT id FROM estados WHERE sigla = 'AP')),
('Santana', (SELECT id FROM estados WHERE sigla = 'AP')),
('Manaus', (SELECT id FROM estados WHERE sigla = 'AM')),
('Parintins', (SELECT id FROM estados WHERE sigla = 'AM')),
('Salvador', (SELECT id FROM estados WHERE sigla = 'BA')),
('Feira de Santana', (SELECT id FROM estados WHERE sigla = 'BA')),
('Fortaleza', (SELECT id FROM estados WHERE sigla = 'CE')),
('Juazeiro do Norte', (SELECT id FROM estados WHERE sigla = 'CE')),
('Brasília', (SELECT id FROM estados WHERE sigla = 'DF')),
('Goiânia', (SELECT id FROM estados WHERE sigla = 'GO')),
('Vitória', (SELECT id FROM estados WHERE sigla = 'ES')),
('Cachoeiro de Itapemirim', (SELECT id FROM estados WHERE sigla = 'ES')),
('Campo Grande', (SELECT id FROM estados WHERE sigla = 'MS')),
('Dourados', (SELECT id FROM estados WHERE sigla = 'MS')),
('Cuiabá', (SELECT id FROM estados WHERE sigla = 'MT')),
('Várzea Grande', (SELECT id FROM estados WHERE sigla = 'MT')),
('Belo Horizonte', (SELECT id FROM estados WHERE sigla = 'MG')),
('Uberlândia', (SELECT id FROM estados WHERE sigla = 'MG')),
('Belém', (SELECT id FROM estados WHERE sigla = 'PA')),
('Ananindeua', (SELECT id FROM estados WHERE sigla = 'PA')),
('João Pessoa', (SELECT id FROM estados WHERE sigla = 'PB')),
('Campina Grande', (SELECT id FROM estados WHERE sigla = 'PB')),
('Curitiba', (SELECT id FROM estados WHERE sigla = 'PR')),
('Londrina', (SELECT id FROM estados WHERE sigla = 'PR')),
('Recife', (SELECT id FROM estados WHERE sigla = 'PE')),
('Olinda', (SELECT id FROM estados WHERE sigla = 'PE')),
('Teresina', (SELECT id FROM estados WHERE sigla = 'PI')),
('Parnaíba', (SELECT id FROM estados WHERE sigla = 'PI')),
('Rio de Janeiro', (SELECT id FROM estados WHERE sigla = 'RJ')),
('Niterói', (SELECT id FROM estados WHERE sigla = 'RJ')),
('Natal', (SELECT id FROM estados WHERE sigla = 'RN')),
('Mossoró', (SELECT id FROM estados WHERE sigla = 'RN')),
('Porto Alegre', (SELECT id FROM estados WHERE sigla = 'RS')),
('Caxias do Sul', (SELECT id FROM estados WHERE sigla = 'RS')),
('Porto Velho', (SELECT id FROM estados WHERE sigla = 'RO')),
('Ji-Paraná', (SELECT id FROM estados WHERE sigla = 'RO')),
('Boa Vista', (SELECT id FROM estados WHERE sigla = 'RR')),
('Rorainópolis', (SELECT id FROM estados WHERE sigla = 'RR')),
('Florianópolis', (SELECT id FROM estados WHERE sigla = 'SC')),
('Joinville', (SELECT id FROM estados WHERE sigla = 'SC')),
('São Paulo', (SELECT id FROM estados WHERE sigla = 'SP')),
('Campinas', (SELECT id FROM estados WHERE sigla = 'SP')),
('Aracaju', (SELECT id FROM estados WHERE sigla = 'SE')),
('Nossa Senhora do Socorro', (SELECT id FROM estados WHERE sigla = 'SE')),
('Palmas', (SELECT id FROM estados WHERE sigla = 'TO')),
('Araguaína', (SELECT id FROM estados WHERE sigla = 'TO'));

