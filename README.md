# rancher

Port using till now

[root@ol9-admin-01 devops]# sudo ss -tuln
Netid               State                Recv-Q               Send-Q                                                  Local Address:Port                              Peer Address:Port
udp                 UNCONN               0                    0                                                             0.0.0.0:111                                    0.0.0.0:*
udp                 UNCONN               0                    0                                                           127.0.0.1:323                                    0.0.0.0:*
udp                 UNCONN               0                    0                                                                [::]:111                                       [::]:*
udp                 UNCONN               0                    0                                                               [::1]:323                                       [::]:*
udp                 UNCONN               0                    0                                  [fe80::17e9:ffe6:702f:f5bf]%ens224:546                                       [::]:*
tcp                 LISTEN               0                    4096                                                        127.0.0.1:8001                                   0.0.0.0:*
tcp                 LISTEN               0                    4096                                                          0.0.0.0:111                                    0.0.0.0:*
tcp                 LISTEN               0                    128                                                           0.0.0.0:22                                     0.0.0.0:*
tcp                 LISTEN               0                    2000                                                          0.0.0.0:443                                    0.0.0.0:*
tcp                 LISTEN               0                    4096                                                          0.0.0.0:8888                                   0.0.0.0:*
tcp                 LISTEN               0                    4096                                                          0.0.0.0:50000                                  0.0.0.0:*
tcp                 LISTEN               0                    4096                                                             [::]:111                                       [::]:*
tcp                 LISTEN               0                    128                                                              [::]:22                                        [::]:*
tcp                 LISTEN               0                    4096                                                             [::]:8888                                      [::]:*
tcp                 LISTEN               0                    4096                                                             [::]:50000                                     [::]:*
tcp                 LISTEN               0                    4096                                                                *:9100                                         *:*
[root@ol9-admin-01 devops]#


[root@ol9-admin-01 devops]# sudo netstat -tuln
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 127.0.0.1:8001          0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:8888            0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:50000           0.0.0.0:*               LISTEN
tcp6       0      0 :::111                  :::*                    LISTEN
tcp6       0      0 :::22                   :::*                    LISTEN
tcp6       0      0 :::8888                 :::*                    LISTEN
tcp6       0      0 :::50000                :::*                    LISTEN
tcp6       0      0 :::9100                 :::*                    LISTEN
udp        0      0 0.0.0.0:111             0.0.0.0:*
udp        0      0 127.0.0.1:323           0.0.0.0:*
udp6       0      0 :::111                  :::*
udp6       0      0 ::1:323                 :::*
udp6       0      0 fe80::17e9:ffe6:702:546 :::*
[root@ol9-admin-01 devops]#


