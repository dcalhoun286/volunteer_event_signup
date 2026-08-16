module Services
    module Auth
        class JsonWebToken
            def self.secret
                Rails.application.config.secret_key_base
            end

            def self.encode(payload, exp = 1.hour.from_now)
                payload = payload.dup
                payload[:exp] = exp.to_i
                JWT.encode(payload, secret, "HS256")
            end

            def self.decode(token)
                decoded = JWT.decode(token, secret, true, algorithm: "HS256")
                decoded[0]
            end
        end
    end
end
