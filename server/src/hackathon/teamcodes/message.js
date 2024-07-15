export const message = {
  
  sendUpdatedTeamDetails:  (name, teamid, members) => `
    <div style="border: 5px #be94de solid; width: 100%; border-radius: 25px; padding: 20px; font-family: Arial, sans-serif;">
      <p style="text-align: center;">
        <h4>New <b>Message</b> From Team AST</h4>
      </p>
      <p style="text-align: center;">
        <h1>VEDIC VISION HACKATHON</h1>
      </p>
      <div style="text-align: center;">
        Welcome to Vedic Vision Hackathon, Team ${name}!
        <br />
        <h3>Your login details for problem statement Registration and for Hackathon </h3>
      </div>
      <div style="text-align: center;">
        <h1>Your Registered Team Name: ${name}</h1>
        <h2>Your ID: ${teamid}</h2>
        <h1>Your Password: check registration mail</h1>
        <h2> your team members registration numbers </h2>
        <ol padding: 0;">
          ${members.map(member => `<li>${member}</li>`).join('')}
        </ol>
      </div>
      <br />
      <p style="text-align: center; margin-top: 20px;">
        For any queries, contact us at <a href="mailto:hackathon@ast-admin.in">hackathon@ast-admin.in</a> or call us at +91 6302423327
      <br>
        Team AST
      </p>
    </div>`
  
}
