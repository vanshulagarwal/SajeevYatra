const { Server } = require("socket.io");

const User = require('./models/user');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        }
    });

    io.on("connection", async (socket) => {
        console.log("connected", socket.id);

        socket.on("join-room", (room) => {
            socket.join(room);
            console.log(`${socket.id} joined ${room}`);
        })

        let nearbyAmbulances = [];
        socket.on("find-ambulance", async (form_data) => {
            socket.join(form_data.phnum);
            console.log('finding ambulance');
            console.log(`${socket.id} joined ${form_data.phnum}`);
            let searchRadius = 0.25;

            try {
                // while (nearbyAmbulances.length === 0 && searchRadius <= 1.0) {
                    nearbyAmbulances = await User.find({
                        "address.latitude": { $gte: form_data.latitude - searchRadius, $lte: form_data.latitude + searchRadius },
                        "address.longitude": { $gte: form_data.longitude - searchRadius, $lte: form_data.longitude + searchRadius },
                        "ambulanceIdle": true,
                        "userType": "ambulance"
                    });
                    searchRadius += 0.25;
                // }
                if (nearbyAmbulances.length === 0) {
                    throw new Error("No ambulances near your location");
                }
                console.log(nearbyAmbulances);

                nearbyAmbulances.forEach(ambulance => {
                    socket.to(ambulance.phnum).emit("booking-query", form_data);

                    socket.on("booking-response", ({ response, form_data }) => {
                        if (response === "accept" && !accepted) {
                            // If an ambulance accepts and no other ambulance has accepted yet
                            accepted = true;
                            socket.join(form_data.phnum);
                            socket.to(form_data.phnum).emit('gotomap',true);
                            console.log("Request accepted by ambulance", ambulance._id);
                        } else {
                            // If an ambulance declines or another ambulance has already accepted
                            io.to(socket.id).emit("decline");
                            console.log("Request declined by ambulance", ambulance._id);
                        }
                    });
                });
            }
            catch (e) {
                console.error("Error finding nearby ambulances:", e);
            }
        });

        socket.on("location-update", ({ room, latitude, longitude }) => {
            socket.to(room).emit({ latitude, longitude });
        })

        socket.on("disconnect", () => {
            console.log("disconnected ", socket.id);
        })
    })
};