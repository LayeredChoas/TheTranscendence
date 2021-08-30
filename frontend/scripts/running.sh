export NODE_OPTIONS="--max-old-space-size=7168"
# cd backend && (npm run start:dev&)
# cd ../frontend && npm run dev

# Starting Frontend
pm2 start npm --name "frontend" -- run dev

while :
do
	echo "" > /dev/null
done