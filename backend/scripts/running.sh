export NODE_OPTIONS="--max-old-space-size=7168"

# Create The Database
npx prisma migrate dev

# Starting The Backend
pm2 start npm --name "Backend" -- start

# Viewing The Database
npx prisma studio &

# Backend Logs
pm2 logs

# while :
# do
# 	echo "" > /dev/null
# done