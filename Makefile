IMAGE_NAME = ghcr.io/sofusc/wodsup
TAG       = latest

build:
	docker build -t $(IMAGE_NAME):$(TAG) .

run:
	docker run --rm -p 3000:3000 $(IMAGE_NAME):$(TAG)

push:
	@echo "Logging into GHCR..."
	docker push $(IMAGE_NAME):$(TAG)

local: build run

deploy: build push
