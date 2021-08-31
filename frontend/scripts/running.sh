# cd backend && (npm run start:dev&)
# cd ../frontend && npm run dev
export NODE_OPTIONS="--max-old-space-size=7168"

# Starting Frontend
pm2 start npm --name "frontend" -- run dev

# Frontend Logs
pm2 logs

# while :
# do
# 	echo "" > /dev/null
# done