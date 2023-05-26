#!/bin/bash

# Verificar máquina virtual
echo "Host: $(hostname)"
echo "OS: $(uname -a)"

# Actualizar el sistema
sudo apt-get update
sudo apt-get upgrade -y

# Instalar Pack
if ! command -v pack &>/dev/null; then
  echo "Instalación de Pack"
  sudo add-apt-repository ppa:cncf-buildpacks/pack-cli
  sudo apt-get update
  sudo apt-get install pack-cli
else
  sudo apt-get remove --auto-remove pack-cli
fi

echo "La versión de Pack instalada es:"
pack --version

# Instalar Docker
if ! command -v docker &>/dev/null; then
  echo "Instalación de Docker"
  sudo apt update
  sudo apt install apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
  sudo apt update
  apt-cache policy docker-ce
  sudo apt install docker-ce
else
  echo "Docker ya está instalado"
fi

echo "La versión de Docker instalada es:"
docker --version