# Infraestructura de la aplicación Digital Booking

Esta carpeta contiene la documentación relacionada con el aprovisionamiento de la infraestructura necesaria para el funcionamiento de la aplicación en AWS. Además, de algunos otros archivos necesarios para explicar la cultura DevOps en el equipo.

## Manejo del repositorio

Este repositorio es un "monorepo", es decir, contiene todo el código fuente del proyecto Digital Booking. Por lo tanto, se decidió hacer una división física utilizando carpetas para cada una de las áreas del proyecto: frontend, backend, infraestructura y testing.

![Estructura de carpetas](img/folderStructure.png)

Se utilizó Gitflow como flujo de trabajo de Git. A partir de la rama *main* , se creó la rama *develop* que representa la rama de desarrollo e integración de las diferentes funcionalidades. Las ramas de funcionalidades o *feature branches* fueron creadas a partir de la rama *develop* y fueron nombradas siguiendo la siguiente nomenclatura: "feature/nombre-de-la-característica". Cada desarrollador debe crear la rama *feature* en la que estará trabajando según la historia de usuario asignada si esta no ha sido creada previamente por otro integrante del equipo.

![Estructura de ramificación](img/branchingStrategy.jpg)

## Diseño de la infraestructura

Se diseñó la infraestructura que será aprovisionada en la nube de AWS usando diagrams.net y fue complementado con una breve descripción.

![Estructura de carpetas](img/infrastructureDiagram.png)

Para complementar el diagrama anterior, se agregó la automatización de la infraestructura utilizando Terraform y la utilización de pipelines de CI/CD en Gitlab para actualizar el código de la aplicación de forma automática en la nube. 

![Estructura de carpetas](img/infrastructuraDiagramAutomatization.png)

## Aprovisionamiento de la infraestructura con Terraform 

En la raíz del proyecto se creó el archivo de configuración .gitlab-ci.yml para definir y controlar los flujos de trabajo de integración continua y entrega continua (CI/CD, por sus siglas en inglés) en GitLab. Para el manejo de datos sensibles, en la interfaz de usuario del repositorio de GitLab, en la opción CI/CD Settings, en la sección Variables, se crearon tres variables de entorno con sus respectivos valores para configurar las credenciales de AWS. Estas variables de entorno fueron guardadas como "*Masked*" para que sean reconocidas en el pipeline. 

En la carpeta "infra", se creó otra carpeta denominada "terraform" para almacenar los archivos de configuración de Terraform. Manualmente, se creó el bucket S3 con el nombre "comision3-equipo3" en la región us-east-2. A este bucket se le habilitó el acceso público y el control de versiones, esto último, con el fin de almacenar el estado de Terraform. Una vez creado este bucket, se editó el archivo .gitlab-ci.yml para correr los comandos de Terraform (*init*, *plan* y *apply*) de forma automatizada en la sección *infra_job*. 

tags
team equipo3

## Configuración de la EC2

### Conexión por SSH a la EC2
cd /home/jose/tech_projects/equipo-03/infra/scripts/
chmod 400 instance-key-equipo3.pem
ssh -i instance-key-equipo3.pem -o IdentitiesOnly=yes ubuntu@3.133.253.103

### Desinstalar Apache
sudo systemctl stop apache2
sudo apt remove -y apache2
sudo apt purge -y apache2

### Instalar Nginx
sudo apt update
sudo apt upgrade
sudo apt install -y nginx
nginx -v

### Instalar Java 17
sudo apt update
sudo apt upgrade
sudo apt install -y openjdk-17-jdk
java -version

### Instalar Maven 3.6.3
sudo apt update
wget https://mirrors.estointernet.in/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
tar -xvf apache-maven-3.6.3-bin.tar.gz
sudo mv apache-maven-3.6.3 /opt/
sudo apt install maven
mvn -version

### Configuración variables de entorno 
nano ~/.bashrc

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
export M2_HOME=/usr/share/maven
export M2=$M2_HOME/bin
export PATH=$PATH:$M2

source ~/.bashrc

echo $JAVA_HOME
echo $PATH
echo $M2_HOME
echo $M2


sudo nano /etc/nginx/conf.d/java.conf
server {
    listen 80;
    server_name your-domain.com;
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
    }
}
cd /etc/nginx/conf.d
ls
sudo nginx -t