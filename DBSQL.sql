PGDMP  "                    |            proyecto_de_m3    14.13    16.4 !               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    25191    proyecto_de_m3    DATABASE     �   CREATE DATABASE proyecto_de_m3 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE proyecto_de_m3;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            >           1247    33962    appointments_status_enum    TYPE     W   CREATE TYPE public.appointments_status_enum AS ENUM (
    'active',
    'cancelled'
);
 +   DROP TYPE public.appointments_status_enum;
       public          postgres    false    4            �            1259    33968    appointments    TABLE     &  CREATE TABLE public.appointments (
    id integer NOT NULL,
    date character varying NOT NULL,
    "time" character varying NOT NULL,
    "userId" integer NOT NULL,
    status public.appointments_status_enum DEFAULT 'active'::public.appointments_status_enum NOT NULL,
    description text
);
     DROP TABLE public.appointments;
       public         heap    postgres    false    830    4    830            �            1259    33967    appointments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.appointments_id_seq;
       public          postgres    false    212    4                       0    0    appointments_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;
          public          postgres    false    211            �            1259    33953    credentials    TABLE     �   CREATE TABLE public.credentials (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.credentials;
       public         heap    postgres    false    4            �            1259    33952    credentials_id_seq    SEQUENCE     �   CREATE SEQUENCE public.credentials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.credentials_id_seq;
       public          postgres    false    210    4                       0    0    credentials_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.credentials_id_seq OWNED BY public.credentials.id;
          public          postgres    false    209            �            1259    33978    users    TABLE     
  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    birthdate character varying NOT NULL,
    "nDni" integer NOT NULL,
    "profileImage" character varying,
    credential_id integer
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    33977    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    4    214                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    213            j           2604    33971    appointments id    DEFAULT     r   ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);
 >   ALTER TABLE public.appointments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            i           2604    33956    credentials id    DEFAULT     p   ALTER TABLE ONLY public.credentials ALTER COLUMN id SET DEFAULT nextval('public.credentials_id_seq'::regclass);
 =   ALTER TABLE public.credentials ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            l           2604    33981    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            	          0    33968    appointments 
   TABLE DATA           W   COPY public.appointments (id, date, "time", "userId", status, description) FROM stdin;
    public          postgres    false    212   �%                 0    33953    credentials 
   TABLE DATA           =   COPY public.credentials (id, username, password) FROM stdin;
    public          postgres    false    210   &                 0    33978    users 
   TABLE DATA           b   COPY public.users (id, name, email, birthdate, "nDni", "profileImage", credential_id) FROM stdin;
    public          postgres    false    214   9&                  0    0    appointments_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.appointments_id_seq', 1, false);
          public          postgres    false    211                       0    0    credentials_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.credentials_id_seq', 1, false);
          public          postgres    false    209                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    213            n           2606    33960 *   credentials PK_1e38bc43be6697cdda548ad27a6 
   CONSTRAINT     j   ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.credentials DROP CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6";
       public            postgres    false    210            p           2606    33976 +   appointments PK_4a437a9a27e948726b8bb3e36ad 
   CONSTRAINT     k   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.appointments DROP CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad";
       public            postgres    false    212            r           2606    33985 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public            postgres    false    214            t           2606    33991 $   users REL_23b9db2106e4f409452018f7a7 
   CONSTRAINT     j   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_23b9db2106e4f409452018f7a7" UNIQUE (credential_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "REL_23b9db2106e4f409452018f7a7";
       public            postgres    false    214            v           2606    33987 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public            postgres    false    214            x           2606    33989 $   users UQ_e7f1e0d33d9012a8bf2f008fe75 
   CONSTRAINT     c   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_e7f1e0d33d9012a8bf2f008fe75" UNIQUE ("nDni");
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_e7f1e0d33d9012a8bf2f008fe75";
       public            postgres    false    214            y           2606    33992 +   appointments FK_01733651151c8a1d6d980135cc4    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES public.users(id);
 W   ALTER TABLE ONLY public.appointments DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4";
       public          postgres    false    212    3186    214            z           2606    33997 $   users FK_23b9db2106e4f409452018f7a76    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_23b9db2106e4f409452018f7a76" FOREIGN KEY (credential_id) REFERENCES public.credentials(id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_23b9db2106e4f409452018f7a76";
       public          postgres    false    3182    210    214            	      x������ � �            x������ � �            x������ � �     