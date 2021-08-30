export NODE_OPTIONS="--max-old-space-size=7168"

# Create The Database
npx prisma migrate dev

# Viewing The Database
npx prisma studio &

# Starting The Backend
pm2 start npm --name "Backend" -- start

while :
do
	echo "" > /dev/null
done