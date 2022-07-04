# Path the GraphQL Server will be listening to.
GRAPHQL_PATH=/graphql

# Absolute path to the `files` folder where to save files to.
# For development, use any folder. At the moment is not really used.
FILES_PATH=

# Url that maps to the FILES_PATH. Will not work in development, so set a dummy value. 
FILES_URL=http://localhost:5000/_files

# Folder where the legacy json files are stored.
# Can be left unset.
LEGACY_JSON_DATA_FOLDER_PATH=

# Absolute path to the git repository for the db backup.
# Can be left unset.
DATABASE_BACKUP_REPO_PATH=

# Whether any database backup attempt should be skipped.
# Can be left unset.
SKIP_DATABASE_BACKUP=true

# Encryption key used to encrypt a disabled video's name.
# Can be left unset.
DISABLED_COURSE_CLASS_VIDEO_ENCRYPTION_KEY=

# SSH key to connect to the openfing-video server.
# Should be left unset for development.
OPEN_FING_VIDEO_SSH_KEY=

# SSH host to connect to the openfing-video server.
# Should be left unset for development.
OPEN_FING_VIDEO_SSH_HOST=

# SSH username to connect to the openfing-video server.
# Should be left unset for development.
OPEN_FING_VIDEO_SSH_USERNAME=

# Server host. Can be left unset.
# default: localhost
HOST=localhost

# Port the app will be listening to.
PORT=5000

# URL this server will be listening to.
PUBLIC_URL=http://localhost:5000

# URL of the front-end.
FRONT_END_URL=http://localhost:3000

# Whether to use sudo when executing Docker commands.
DOCKER_USE_SUDO=false

# List of enabled email addresses. Only these will be able to sign up.
ENABLED_EMAIL_ADDRESSES="santiago.gonzalez.pereyra@fing.edu.uy,enrique.severo@fing.edu.uy,joaquin.nunez.craigdallie@fing.edu.uy"

#
# Database connection properties
#

# Host of the PostgreSQL database.
DB_HOST=localhost

# Port PostgreSQL is listening to.
# Depends on your installation of PostgreSQL; it usually is 5432
DB_PORT=5432

# Name of the database.
# This can be anything you want.
DB_NAME=postgres-openfing-server

# Name of the database user.
# Depends on your installation of PostgreSQL.
DB_USERNAME=postgres

# Password of the database user.
# Depends on your installation of PostgreSQL.
DB_PASSWORD=Password01

# 
# Keycloak config
# 

# Name of the initial Keycloak user.
KEYCLOAK_USER=admin

# Password of the initial Keycloak user.
KEYCLOAK_PASSWORD=admin

# Port the Keycloak server will be listening to.
KEYCLOAK_PORT=3001

# Realm name to connect to.
KEYCLOAK_REALM=OpenFING

# Name of the Keycloak database.
KEYCLOAK_DB_NAME=keycloak

#
# Sendinblue config.
# Can be left unset.
#
SEND_IN_BLUE_API_KEY=
SEND_IN_BLUE_SENDER_ADDRESS=
