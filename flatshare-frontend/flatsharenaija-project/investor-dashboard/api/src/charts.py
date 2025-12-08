import matplotlib.pyplot as plt

months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
signups = [120,250,400,600,800,1000,1300,1600,2000,2400,2800,3200]

plt.figure(figsize=(8,4))
plt.plot(months, signups, marker="o")
plt.title("User Growth")
plt.xlabel("Month"); plt.ylabel("New Signups"); plt.grid(True)
plt.savefig("user_growth.png")

free = [1000,1200,1500,1800,2000,2200,2500,2800,3000,3200,3400,3600]
paid = [500,800,1200,1600,2000,2400,2800,3200,3600,4000,4400,4800]
premium = [200,400,600,900,1200,1500,1800,2100,2400,2700,3000,3300]

plt.figure(figsize=(8,4))
plt.bar(months, free, label="Free")
plt.bar(months, paid, bottom=free, label="Paid")
plt.bar(months, premium, bottom=[f+p for f,p in zip(free,paid)], label="Premium")
plt.title("Revenue Breakdown"); plt.xlabel("Month"); plt.ylabel("Revenue (USD)")
plt.legend(); plt.savefig("revenue_breakdown.png")

countries = ["Nigeria","US","UK","Canada","Kenya"]
users = [40,25,15,10,10]

plt.figure(figsize=(6,6))
plt.pie(users, labels=countries, autopct="%1.1f%%")
plt.title("Geographic Distribution")
plt.savefig("geography.png")

print("Charts saved: user_growth.png, revenue_breakdown.png, geography.png")
