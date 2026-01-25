# 1. Store name and age, then print a message
name = "Shaloom"
age = 20
print(f"Hello, {name} you are {age} years old")


# 2. Calculate the area of a circle using radius from keyboard
radius = float(input("\nEnter the radius of the circle: "))
pi = 3.14159
area = pi * radius * radius
print("Area of the circle is:", area)


# 3. Ask a number and check if it is above 50
number = int(input("\nEnter a number: "))
if number > 50:
    print("The number is above 50")
else:
    print("The number is 50 or below")


# 4. Check if a number is divisible by 3 or a multiple of 5
num = int(input("\nEnter a number: "))
if num % 3 == 0 or num % 5 == 0:
    print("The number is divisible by 3 or a multiple of 5")
else:
    print("The number is NOT divisible by 3 and NOT a multiple of 5")


# 5. Ask student marks and print grade
marks = int(input("\nEnter student marks: "))

if marks >= 80:
    print("Grade: A")
elif marks >= 70:
    print("Grade: B")
elif marks >= 60:
    print("Grade: C")
elif marks >= 50:
    print("Grade: D")
else:
    print("Grade: F")


# 6. Print all numbers from 1 to 20
print("\nNumbers from 1 to 20:")
for i in range(1, 21):
    print(i)


# 7. Print all even numbers from 10 to 50 using for loop
print("\nEven numbers from 10 to 50:")
for i in range(10, 51):
    if i % 2 == 0:
        print(i)


# 8. Simulate a login system with 3 attempts
correct_username = "admin"
correct_password = "1234"
attempts = 0

while attempts < 3:
    username = input("\nEnter username: ")
    password = input("Enter password: ")

    if username == correct_username and password == correct_password:
        print(f"Welcome, {username}")
        break
    else:
        attempts += 1
        print("Incorrect username or password")

if attempts == 3:
    print("Your account is blocked")
