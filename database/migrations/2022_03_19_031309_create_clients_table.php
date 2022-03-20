<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('fio')->nullable();
            $table->string('fio_parent')->nullable();
            $table->json('phone')->nullable();
            $table->json('phone_parent')->nullable();
            $table->json('other_contact')->nullable();
            $table->date('birthday')->nullable();
            $table->tinyInteger('gender')->unsigned();
            $table->text('comment')->nullable();
            $table->foreignId('group_id')->constrained();
            $table->tinyInteger('number_job')->unsigned()->nullable();
            $table->tinyInteger('left_job')->unsigned()->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
};
