FROM denoland/deno:2.6.10

EXPOSE 54444

WORKDIR /app

USER deno

COPY deno.json .
COPY main.ts .
RUN deno cache main.ts

CMD ["run", "-A", "main.ts"]
