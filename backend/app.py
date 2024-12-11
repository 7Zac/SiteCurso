from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import hashlib

app = Flask(__name__)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Habilita CORS para todas as origens
CORS(app)

db = SQLAlchemy(app)

# Modelo de Usuário
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

# Inicializa o banco de dados
with app.app_context():
    db.create_all()

@app.route('/users', methods=['POST'])
def create_user():
    """Endpoint para criar um novo usuário (Cadastro)"""
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Usuário e senha são obrigatórios"}), 400

    # Verifica se o usuário já existe
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Usuário já existe"}), 400

    # Cria e adiciona o novo usuário
    hashed_password = hashlib.sha256(password.encode()).hexdigest()  # Criptografa a senha
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário cadastrado com sucesso"}), 201


@app.route('/login', methods=['POST'])
def login_user():
    """Endpoint para login do usuário"""
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Usuário e senha são obrigatórios"}), 400

    # Verifica se o usuário existe
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404

    # Verifica a senha (comparando a senha criptografada)
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if user.password != hashed_password:
        return jsonify({"error": "Senha incorreta"}), 401

    return jsonify({"message": "Login realizado com sucesso!"}), 200


@app.route('/users', methods=['GET'])
def get_users():
    """Endpoint para listar usuários"""
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.username} for user in users])

# Roda o servidor
if __name__ == '__main__':
    app.run(debug=True)
