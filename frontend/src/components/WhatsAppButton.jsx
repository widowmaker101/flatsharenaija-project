import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({
  phone = "2347030176297",
  message = "Hello Flatshare Naija! I'm interested in a flat...",
  className = "",
  size = "default",
  showText = true,
  variant = "solid",
}) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  const sizeClasses = {
    small: "btn btn-sm gap-2",
    default: "btn gap-2",
    large: "btn btn-lg gap-2",
  }[size] || "btn gap-2";

  const variantClasses = {
    solid: "btn-success text-white hover:brightness-110",
    outline: "btn-outline btn-success hover:bg-success hover:text-white",
    ghost: "btn-ghost text-success hover:bg-success/10",
  }[variant] || "btn-success text-white hover:brightness-110";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${sizeClasses} ${variantClasses} ${className} normal-case transition-all duration-200`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={size === "small" ? 18 : 22} />
      {showText && <span>Chat on WhatsApp</span>}
    </a>
  );
}
