const prisma = require('./lib/prisma').default;

async function checkUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log("Registered users in DB:");
    users.forEach(u => {
      console.log(`- ${u.name} (${u.email}) - Password set: ${!!u.password}`);
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
