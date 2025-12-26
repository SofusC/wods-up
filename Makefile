IMAGE_NAME = ghcr.io/sofusc/wodsup
TAG       = latest

build:
	docker build -t $(IMAGE_NAME):$(TAG) .

run:
	docker run --init --rm -p 3000:3000 --read-only $(IMAGE_NAME):$(TAG)

push:
	docker push $(IMAGE_NAME):$(TAG)

local: build run

deploy: build push
