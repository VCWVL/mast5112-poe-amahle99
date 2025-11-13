import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [screen, setScreen] = useState<"splash" | "auth" | "menu" | "cart" | "manage" | "guest">("splash");
  const [role, setRole] = useState<"chef" | "user" | null>(null);
  const [category, setCategory] = useState<"All" | "Brunch" | "Lunch" | "Dinner">("All");
  const [cart, setCart] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState([
    { id: "1", name: "Chicken Pasta", price: 104, desc: "grilled chicken, parsley, creamy sauce", image: require("./assets/pasta.jpg"), category: "Lunch" },
    { id: "2", name: "Pepperoni Pizza", price: 95, desc: "cheese, tomato, pepperoni, olives", image: require("./assets/pizza.jpg"), category: "Lunch" },
    { id: "3", name: "Sticky Wings & Fries", price: 88, desc: "bbq sauce, chicken, potato fries, jalapeño", image: require("./assets/wings.jpg"), category: "Dinner" },
    { id: "4", name: "Burger & Fries", price: 65, desc: "beef patty, lettuce, cheese, tomato, fries", image: require("./assets/burger.jpg"), category: "Lunch" },
    { id: "5", name: "Ribs & Fries", price: 104, desc: "pork ribs and potato chips", image: require("./assets/ribs.jpg"), category: "Dinner" },
    { id: "6", name: "Chicken Nuggets", price: 50, desc: "chicken nuggets, creamy jalapeño sauce, fries", image: require("./assets/nuggets.jpg"), category: "Brunch" },
    { id: "7", name: "Lambchops & Mash", price: 176, desc: "lamb chops, creamy mash", image: require("./assets/lamb.jpg"), category: "Dinner" },
    { id: "8", name: "Rice & Chicken", price: 210, desc: "rice, creamy chicken curry", image: require("./assets/rice.jpg"), category: "Dinner" },
    { id: "9", name: "Pancake Platter", price: 350, desc: "pancakes, berries, maple syrup", image: require("./assets/pancake.jpg"), category: "Brunch" },
    { id: "10", name: "Fruit Platter", price: 250, desc: "grapes, sausage, banana, apple", image: require("./assets/fruit.jpg"), category: "Brunch" },
    { id: "11", name: "Garlic Bread & Sauces", price: 250, desc: "garlic bread, jalapeño sauce, bbq sauce", image: require("./assets/garlic.jpg"), category: "Brunch" },
    { id: "12", name: "Vegetable Wrap", price: 140, desc: "vegetables, hummus, whole wheat wrap", image: require("./assets/Wrap.jpg"), category: "Lunch" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // CART FUNCTIONS
  const addToCart = (item: any) => {
    const existing = cart.find((x) => x.id === item.id);
    if (existing) {
      setCart(cart.map((x) => (x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x)));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existing = cart.find((x) => x.id === itemId);
    if (existing.quantity > 1) {
      setCart(cart.map((x) => (x.id === itemId ? { ...x, quantity: x.quantity - 1 } : x)));
    } else {
      setCart(cart.filter((x) => x.id !== itemId));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // CALCULATE AVERAGE PRICES BY CATEGORY
  const calculateAverages = () => {
    const categories = ["Brunch", "Lunch", "Dinner"];
    const averages: { [key: string]: number } = {};
    categories.forEach(cat => {
      const items = menuItems.filter(item => item.category === cat);
      if (items.length > 0) {
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        averages[cat] = Math.round(totalPrice / items.length);
      } else {
        averages[cat] = 0;
      }
    });
    return averages;
  };

  // MENU EDIT FUNCTIONS
  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDelete = (item: any) => {
    setMenuItems(menuItems.filter(menuItem => menuItem.id !== item.id));
  };

  const handleAdd = () => {
    setEditingItem({ id: Date.now().toString(), name: "", price: 0, desc: "", category: "Lunch", image: require("./assets/pasta.jpg") });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingItem.id && menuItems.find(item => item.id === editingItem.id)) {
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? editingItem : item));
    } else {
      setMenuItems([...menuItems, editingItem]);
    }
    setIsEditing(false);
    setEditingItem(null);
  };

  // SPLASH SCREEN
  if (screen === "splash") {
    return (
      <ImageBackground
        source={require("./assets/chef.jpg")}
        style={styles.splashContainer}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Menu Maestro</Text>
          <TouchableOpacity style={styles.button} onPress={() => setScreen("auth")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => setScreen("guest")}>
            <Text style={styles.buttonText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // AUTH SCREEN
  if (screen === "auth") {
    return (
      <SafeAreaView style={styles.authContainer}>
        <ScrollView contentContainerStyle={styles.authInner}>
          <Text style={styles.menuTitle}>Welcome to Menu Maestro</Text>

          <TouchableOpacity style={styles.button} onPress={() => { setRole("user"); setScreen("menu"); }}>
            <Text style={styles.buttonText}>Login as Chef</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // CART SCREEN
  if (screen === "cart") {
    return (
      <SafeAreaView style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Your Cart</Text>

        {cart.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.menuImage} />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuDesc}>
                    Qty: {item.quantity} | R{item.price * item.quantity}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="remove-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <Text style={styles.totalText}>Total: R{total}</Text>

        <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => setScreen("menu")}>
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // MANAGE SCREEN
  if (screen === "manage") {
    return (
      <>
        <SafeAreaView style={styles.menuContainer}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.menuTitle}>Manage Menu</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAdd}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Add menu item"
            >
              <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => { setScreen("auth"); setRole(null); }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Logout"
            >
              <Ionicons name="log-out-outline" size={28} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} />
              <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{item.name} : R{item.price}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={styles.iconButton}
                  accessibilityLabel={`Edit ${item.name}`}
                >
                  <Ionicons name="create-outline" size={22} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={styles.iconButton}
                  accessibilityLabel={`Delete ${item.name}`}
                >
                  <Ionicons name="trash-outline" size={22} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => { setScreen("menu"); setRole("user"); }}>
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
        </SafeAreaView>
        <Modal visible={isEditing} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{editingItem?.id && menuItems.find(item => item.id === editingItem.id) ? "Edit Item" : "Add Item"}</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editingItem?.name || ""}
                onChangeText={(text) => setEditingItem({ ...editingItem, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={editingItem?.price?.toString() || ""}
                onChangeText={(text) => setEditingItem({ ...editingItem, price: parseFloat(text) || 0 })}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={editingItem?.desc || ""}
                onChangeText={(text) => setEditingItem({ ...editingItem, desc: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Category"
                value={editingItem?.category || ""}
                onChangeText={(text) => setEditingItem({ ...editingItem, category: text })}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.button, { backgroundColor: "#ccc" }]} onPress={() => { setIsEditing(false); setEditingItem(null); }}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  // GUEST SCREEN
  if (screen === "guest") {
    const filteredMenu =
      category === "All" ? menuItems : menuItems.filter((item) => item.category === category);
    const averages = calculateAverages();

    return (
      <SafeAreaView style={styles.menuContainer}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.menuTitle}>MENU</Text>
            {category === "All" && <Text style={styles.countText}>Total items: {menuItems.length}</Text>}
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.loginButton} onPress={() => setScreen("auth")}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {category === "All" && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Average Prices</Text>
            <Text style={styles.summaryText}>Brunch: R{averages.Brunch}</Text>
            <Text style={styles.summaryText}>Lunch: R{averages.Lunch}</Text>
            <Text style={styles.summaryText}>Dinner: R{averages.Dinner}</Text>
          </View>
        )}

        <View style={styles.categoryContainer}>
          {(["All", "Brunch", "Lunch", "Dinner"] as const).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, category === cat && styles.categoryActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} />
              <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{item.name} : R{item.price}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  // Default return for App component
  return null;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  authContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  authInner: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  categoryActive: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  listContainer: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  menuInfo: {
    flex: 1,
    marginLeft: 10,
  },
  menuName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
    paddingRight: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
  },
  addButton: {
    marginRight: 10,
  },
  logoutButton: {
    marginLeft: 6,
    padding: 6,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  summaryContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
  },
  countText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    elevation: 4,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },  
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
