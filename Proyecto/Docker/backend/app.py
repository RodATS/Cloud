from flask import Flask, request, jsonify

app = Flask(__name__)
emails = []

@app.route("/emails", methods=["GET", "POST"])
def manage_emails():
    if request.method == "POST":
        email = request.json.get("email")
        emails.append(email)
        return jsonify({"message": "Email added", "emails": emails}), 201
    return jsonify(emails)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
