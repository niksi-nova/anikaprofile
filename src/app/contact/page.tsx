export default function Contact() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <form
        action="https://formsubmit.co/anikaub20@gmail.com" 
        method="POST"
        className="flex flex-col space-y-4"
      >
        {/* Hidden field prevents spam */}
        <input type="hidden" name="_captcha" value="false" />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-2 border rounded text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-2 border rounded text-black"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="p-2 border rounded text-black"
        />
        <button type="submit" className="bg-yellow-500 text-black p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
