ConstrulogTS

Sistema desenvolvido em React Native com Expo, utilizando TypeScript.

Índice

Pré-requisitos

Instalação

Windows

Linux

Dependências

Scripts disponíveis

Estrutura do projeto

Pré-requisitos

Antes de instalar o projeto, você precisa ter instalado:

Node.js (recomendado: v20.x)

npm (vem junto com o Node.js)

Git (opcional, caso vá clonar do repositório)

Expo CLI:

npm install -g expo-cli

Instalação

Clone o projeto ou baixe o código e, na pasta raiz do projeto, execute:

npm install


Isso instalará todas as dependências listadas no package.json.

Windows

Abra o PowerShell ou CMD na pasta do projeto.

Execute:

npm install


Para iniciar o app no emulador Android:

npm run android


Para iniciar no simulador iOS (somente se estiver no Mac):

npm run ios


Para rodar no navegador:

npm run web

Linux

Abra o Terminal na pasta do projeto.

Execute:

npm install


Para iniciar o app no emulador Android:

npm run android


Para rodar no navegador:

npm run web


Observação: iOS só funciona em macOS.

Dependências
Principais
Dependência	Versão	Descrição
expo	~49.0.23	Framework principal para React Native
react	18.2.0	Biblioteca React
react-native	0.72.10	Biblioteca principal React Native
react-dom	18.2.0	Renderização web do React
react-native-gesture-handler	~2.12.0	Gestos avançados
react-native-reanimated	~3.3.0	Animações
react-native-safe-area-context	4.6.3	Segurança em áreas da tela
react-native-screens	~3.22.0	Gerenciamento de telas
react-native-vector-icons	^10.3.0	Ícones vetoriais
@react-navigation/native	^6.1.6	Navegação
@react-navigation/drawer	^6.6.2	Drawer Navigation
@react-navigation/stack	^6.3.16	Stack Navigation
expo-sqlite	~11.3.3	Banco de dados SQLite
@react-native-async-storage/async-storage	^2.2.0	Armazenamento local
@react-native-community/datetimepicker	7.2.0	Seletor de data/hora
@expo-google-fonts/montserrat	^0.4.2	Fonte Montserrat
@expo/webpack-config	^19.0.0	Configuração Webpack para Expo Web
react-native-web	~0.19.6	Compatibilidade web para React Native
DevDependencies
Dependência	Versão	Descrição
@babel/core	^7.20.0	Transpiler do JS
typescript	^5.1.3	TypeScript
@types/react	~18.2.14	Tipagens React
Scripts disponíveis
Script	Comando	Descrição
start	npm start	Inicia o Expo DevTools
android	npm run android	Abre app em emulador Android ou dispositivo conectado
ios	npm run ios	Abre app em simulador iOS (macOS)
web	npm run web	Roda o app no navegador
Estrutura do projeto (sugestão)
/construlogts
│
├─ /node_modules
├─ /assets
├─ /src
│  ├─ /components
│  ├─ /screens
│  ├─ /navigation
│  └─ App.tsx
├─ package.json
├─ tsconfig.json
└─ README.md
