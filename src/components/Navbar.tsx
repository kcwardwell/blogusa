const menu = [  
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "About", href: "/about" },
  { id: 3, label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        {menu.map((item) => (
          <li key={item.id}>
            <a href={item.href} className="text-white hover:text-gray-300">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
