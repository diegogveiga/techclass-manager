# TechClass Manager

<img width="1919" height="1079" alt="Tela2_techclass-manager" src="https://github.com/user-attachments/assets/e47e10f3-85a9-4101-9b5b-24bbe0c76d8d" />


Aplicação full-stack para gerenciamento de cursos e alunos desenvolvida como portfólio.

## Tecnologias
- React + Vite (Frontend)
- Node.js + Express (Backend)
- SQLite (Banco de dados)

## Funcionalidades
- Dashboard com métricas
- CRUD completo de cursos e alunos
- Interface responsiva

## Acesso
**Status:** Backend em fase de configuração para deploy
**Código-fonte:** Disponível neste repositório

## 📸 Screenshots
<img width="1919" height="1079" alt="Tela1_techclass-manager" src="https://github.com/user-attachments/assets/4eb01cf0-cd81-4c0e-bd09-496be76c9a00" />
<img width="1919" height="1079" alt="Tela2_techclass-manager" src="https://github.com/user-attachments/assets/229be8e1-8d1b-4ce0-8253-876c79599748" />
<img width="1919" height="1079" alt="Tela3_techclass-manager" src="https://github.com/user-attachments/assets/f5a86aae-ac8f-482b-8272-706e158e258c" />
<img width="1919" height="1079" alt="Tela4_techclass-manager" src="https://github.com/user-attachments/assets/41f2936e-cea6-4981-b201-1bb106b18f04" />
<img width="1919" height="1079" alt="Tela5_techclass-manager" src="https://github.com/user-attachments/assets/495cfeb9-1e6e-4c41-b887-f5466055dc64" />

### Endpoints disponíveis:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/courses` | Lista todos os cursos |
| GET | `/courses/:id` | Busca um curso específico |
| POST | `/courses` | Cria um novo curso |
| PUT | `/courses/:id` | Atualiza um curso |
| DELETE | `/courses/:id` | Remove um curso |
| GET | `/students` | Lista todos os alunos |
| GET | `/students/:id` | Busca um aluno específico |
| POST | `/students` | Cria um novo aluno |
| PUT | `/students/:id` | Atualiza um aluno |
| DELETE | `/students/:id` | Remove um aluno |

## 🚀 Como executar localmente

### Pré-requisitos
- Node.js instalado
- Git

### Backend
```bash
# Clone o repositório
git clone https://github.com/diegogveiga/techclass-manager.git

# Entre na pasta do backend
cd techclass-manager/backend

# Instale as dependências
npm install

# Execute o servidor
node server.js
```

### Frontend
```bash
# Em outro terminal, entre na pasta do frontend
cd techclass-manager/frontend

# Instale as dependências
npm install

# Execute o frontend
npm run dev
```


## 💻 Executando localmente
```
O projeto está 100% funcional em ambiente de desenvolvimento. 
Para testar, siga as instruções acima e acesse `http://localhost:5173`
```

## 📁 Estrutura do Projeto

```
techclass-manager/
├── backend/
│   ├── database/
│   │   └── database.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🛠️ Melhorias Futuras

- [ ] Autenticação de usuários
- [ ] Gráficos mais detalhados
- [ ] Busca e filtros avançados
- [ ] Deploy do frontend no Vercel


## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Diego Gomes Veiga**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/diegogomesveiga)  
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/diegogveiga)
