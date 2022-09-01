server {
        listen  80;
        server_name huvitz.magnetar.ai;

        location / {
                rewrite /(.*) /$1 break;
                proxy_set_header  X-Forwarded-Host $host:$server_port;
                proxy_set_header  X-Forwarded-Server $host;
                proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass        http://127.0.0.1:3030;
                access_log        /var/log/nginx/access.rest.log;
                error_log         /var/log/nginx/error.rest.log warn;
        }
}
