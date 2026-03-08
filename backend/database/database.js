// backend/database/database.js
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

// Função para abrir a conexão com o banco de dados
async function openDb() {
  return open({
    filename: process.env.NODE_ENV === 'production' 
      ? '/tmp/database.db'  // Render tem diretório /tmp gravável
      : './database.db',    // Local: arquivo na pasta do projeto
    driver: sqlite3.Database
  })
}

// Função para criar as tabelas se elas não existirem
async function setupDatabase() {
  const db = await openDb()
  
  // Cria a tabela de cursos
  await db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      students INTEGER DEFAULT 0,
      averageGrade REAL DEFAULT 0.0
    );
  `)

  // Cria a tabela de estudantes
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      course TEXT NOT NULL,
      grade INTEGER NOT NULL
    );
  `)

  // Popula com dados iniciais se as tabelas estiverem vazias
  const courseCount = await db.get('SELECT COUNT(*) as count FROM courses')
  if (courseCount.count === 0) {
    await db.run('INSERT INTO courses (name, students, averageGrade) VALUES (?, ?, ?)', 'Python para iniciantes', 32, 8.4)
    await db.run('INSERT INTO courses (name, students, averageGrade) VALUES (?, ?, ?)', 'HTML e CSS', 18, 7.9)
    await db.run('INSERT INTO courses (name, students, averageGrade) VALUES (?, ?, ?)', 'Lógica de Programação', 25, 8.1)
    console.log('Dados iniciais de cursos inseridos.')
  }

  const studentCount = await db.get('SELECT COUNT(*) as count FROM students')
  if (studentCount.count === 0) {
    await db.run('INSERT INTO students (name, course, grade) VALUES (?, ?, ?)', 'Ana', 'Python', 9)
    await db.run('INSERT INTO students (name, course, grade) VALUES (?, ?, ?)', 'Carlos', 'Python', 7)
    await db.run('INSERT INTO students (name, course, grade) VALUES (?, ?, ?)', 'Julia', 'HTML', 8)
    await db.run('INSERT INTO students (name, course, grade) VALUES (?, ?, ?)', 'Pedro', 'Lógica', 6)
    await db.run('INSERT INTO students (name, course, grade) VALUES (?, ?, ?)', 'Marina', 'Python', 10)
    console.log('Dados iniciais de estudantes inseridos.')
  }

  console.log('Banco de dados configurado com sucesso.')
  await db.close()
}

module.exports = { openDb, setupDatabase }