<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $groups = Group::all();

        return [
            'fio' => $this->faker->name(),
            'fio_parent' => $this->faker->name(),
            'phone' => json_encode([
                $this->faker->numerify('9#########'),
                $this->faker->numerify('9#########'),
            ]),
            'phone_parent' => json_encode([
                $this->faker->numerify('9#########'),
                $this->faker->numerify('9#########'),
            ]),
            'gender' => collect(array_keys(Client::GENDERS))->random(),
//            'email' => $this->faker->unique()->safeEmail(),
//            'email_verified_at' => now(),
//            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
//            'remember_token' => Str::random(10),
            'group_id' => $groups->random()
        ];
    }
}
