const express = require("express")
const cors = require("cors")
const { openDb, setupDatabase } = require('./database/database')

const app = express()


// Middlewares - ordem IMPORTANTE!
app.use(cors()) // Permite requisições de outras origens
app.use(express.json()) // Permite receber JSON no corpo da requisição
app.use(express.urlencoded({ extended: true })) // Permite dados de formulário

// Configura o banco de dados
setupDatabase()

// Rota de teste na raiz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API TechClass Manager',
    status: 'online',
    endpoints: {
      courses: '/courses',
      students: '/students'
    }
  })
})

// --- ROTAS PARA CURSOS ---

// GET /courses - Listar todos
app.get("/courses", async (req, res) => {
  try {
    const db = await openDb()
    const courses = await db.all('SELECT * FROM courses')
    res.json(courses)
    await db.close()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /courses/:id - Buscar por ID
app.get("/courses/:id", async (req, res) => {
  try {
    const db = await openDb()
    const course = await db.get('SELECT * FROM courses WHERE id = ?', req.params.id)
    await db.close()
    course ? res.json(course) : res.status(404).json({ message: 'Curso não encontrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /courses - Criar novo curso
app.post("/courses", async (req, res) => {
  try {
    console.log('Dados recebidos no POST /courses:', req.body)
    
    const { name, students, averageGrade } = req.body
    
    if (!name) {
      return res.status(400).json({ message: 'Nome do curso é obrigatório' })
    }
    
    const db = await openDb()
    const result = await db.run(
      'INSERT INTO courses (name, students, averageGrade) VALUES (?, ?, ?)',
      name,
      students || 0,
      averageGrade || 0.0
    )
    
    const newCourse = await db.get('SELECT * FROM courses WHERE id = ?', result.lastID)
    await db.close()
    
    res.status(201).json(newCourse)
  } catch (error) {
    console.error('Erro no POST /courses:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT /courses/:id - Atualizar
app.put("/courses/:id", async (req, res) => {
  try {
    const { name, students, averageGrade } = req.body
    const db = await openDb()
    
    const result = await db.run(
      'UPDATE courses SET name = ?, students = ?, averageGrade = ? WHERE id = ?',
      name, students, averageGrade, req.params.id
    )
    
    if (result.changes > 0) {
      const updatedCourse = await db.get('SELECT * FROM courses WHERE id = ?', req.params.id)
      await db.close()
      res.json(updatedCourse)
    } else {
      await db.close()
      res.status(404).json({ message: 'Curso não encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /courses/:id - Deletar
app.delete("/courses/:id", async (req, res) => {
  try {
    const db = await openDb()
    const result = await db.run('DELETE FROM courses WHERE id = ?', req.params.id)
    await db.close()
    
    result.changes > 0 ? res.status(204).send() : res.status(404).json({ message: 'Curso não encontrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// --- ROTAS PARA ESTUDANTES ---

// GET /students - Listar todos
app.get("/students", async (req, res) => {
  try {
    const db = await openDb()
    const students = await db.all('SELECT * FROM students')
    res.json(students)
    await db.close()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /students/:id - Buscar por ID
app.get("/students/:id", async (req, res) => {
  try {
    const db = await openDb()
    const student = await db.get('SELECT * FROM students WHERE id = ?', req.params.id)
    await db.close()
    student ? res.json(student) : res.status(404).json({ message: 'Estudante não encontrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /students - Criar novo estudante
app.post("/students", async (req, res) => {
  try {
    console.log('Dados recebidos no POST /students:', req.body)
    
    const { name, course, grade } = req.body
    
    if (!name || !course || grade === undefined) {
      return res.status(400).json({ message: 'Nome, curso e nota são obrigatórios' })
    }
    
    const db = await openDb()
    const result = await db.run(
      'INSERT INTO students (name, course, grade) VALUES (?, ?, ?)',
      name, course, grade
    )
    
    const newStudent = await db.get('SELECT * FROM students WHERE id = ?', result.lastID)
    await db.close()
    
    res.status(201).json(newStudent)
  } catch (error) {
    console.error('Erro no POST /students:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT /students/:id - Atualizar
app.put("/students/:id", async (req, res) => {
  try {
    const { name, course, grade } = req.body
    const db = await openDb()
    
    const result = await db.run(
      'UPDATE students SET name = ?, course = ?, grade = ? WHERE id = ?',
      name, course, grade, req.params.id
    )
    
    if (result.changes > 0) {
      const updatedStudent = await db.get('SELECT * FROM students WHERE id = ?', req.params.id)
      await db.close()
      res.json(updatedStudent)
    } else {
      await db.close()
      res.status(404).json({ message: 'Estudante não encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /students/:id - Deletar
app.delete("/students/:id", async (req, res) => {
  try {
    const db = await openDb()
    const result = await db.run('DELETE FROM students WHERE id = ?', req.params.id)
    await db.close()
    
    result.changes > 0 ? res.status(204).send() : res.status(404).json({ message: 'Estudante não encontrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`)
  console.log(`📚 Teste: http://localhost:${port}/courses`)
  console.log(`👨‍🎓 Teste: http://localhost:${port}/students`)
})  