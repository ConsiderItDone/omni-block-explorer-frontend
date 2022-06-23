## Build docker image
.PHONY: docker-build
docker-build:
	docker build -t nodle-frontend --build-arg HTTP_ENDPOINT_ARG=$(HTTP_ENDPOINT_ARG) --build-arg WS_ENDPOINT_ARG=$(WS_ENDPOINT_ARG) .
